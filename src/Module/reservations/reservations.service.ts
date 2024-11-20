import {  BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {  MAIL_PROVIDER, RESERVATION_PROVIDER, RESTAURANT_PROVIDER } from '@/Helpers/contants';
import { Op } from 'sequelize';
import { Reservation } from './entities/reservations.entities';
import { CreateReservationDto } from './dto/reservations.dto';
import { Restaurant } from '../restaurant/entities/restaurant.entities';
import { ReservationStatus } from '@/enums/reservation_status.enum';
import * as moment from 'moment';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';

@Injectable()
export class ReservationsService {
  constructor(
    @Inject(RESERVATION_PROVIDER)
    private readonly repositoryReservation: typeof Reservation,
    
    @Inject(RESTAURANT_PROVIDER)
    private readonly repositoryRestaurant: typeof Restaurant,
    private emailService: EmailService,
    
  ) {}
   async findAll(payload) {
    const filter = {};
    return this.repositoryReservation.findAll({
      where: filter,
    });
  }
   async findByPk(payload) {
    return this.repositoryReservation.findByPk(payload, {
      include: ['customer'], // Asumsikan ada relasi dengan model User
    });
  }
  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {    
    const restaurant = await this.repositoryRestaurant.findByPk(createReservationDto.restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    // Validasi jam operasional restaurant
    const requestTime = moment(createReservationDto.reservationTime, 'HH:mm');
    const openingTime = moment(restaurant.openingTime, 'HH:mm');
    const closingTime = moment(restaurant.closingTime, 'HH:mm');
    if (requestTime.isBefore(openingTime) || requestTime.isAfter(closingTime)) {
      
      throw new BadRequestException(
        `Restaurant is only open between ${restaurant.openingTime} and ${restaurant.closingTime}`
      );
    }

    // // Cek ketersediaan meja pada waktu yang diminta
    
    const existingReservations = await this.checkExistingReservations(
      createReservationDto.restaurantId,
      createReservationDto.reservationDate,
      createReservationDto.reservationTime
    );
    const totalTablesNeeded = Math.ceil(createReservationDto.partySize / 4); 
    const tablesAvailable = restaurant.totalTables - existingReservations.length;

    if (tablesAvailable < totalTablesNeeded) {
      throw new BadRequestException(
        'No tables available at this time. Please choose another time.'
      );
    }

    const reservation = await this.repositoryReservation.create({
      ...createReservationDto,
      status: ReservationStatus.CONFIRMED
    });
    const reservationWithUser = await this.repositoryReservation.findByPk(
      reservation.id,
      {
        include: ['customer'],
      },
    );
     this.emailService.sendReservationConfirmation(reservationWithUser);
    return reservation;
  }

  async remove(id: number) {
    return await this.repositoryReservation.destroy({ where: { id } });
  }

  async get(attr = {}) {
    return this.repositoryReservation.findAll(attr);
  }


  private async checkExistingReservations(
    restaurantId: number,
    date: Date,
    time: string
  ): Promise<Reservation[]> {
    // Konversi waktu reservasi ke timestamp
    const reservationDateTime = moment(date).format('YYYY-MM-DD') + ' ' + time;
    const requestTimestamp = moment(reservationDateTime, 'YYYY-MM-DD HH:mm');

    // Cek reservasi dalam rentang 2 jam (1 jam sebelum dan 1 jam sesudah)
    const startTime = moment(requestTimestamp).subtract(1, 'hour').format('HH:mm');
    const endTime = moment(requestTimestamp).add(1, 'hour').format('HH:mm');

    return await this.repositoryReservation.findAll({
      where: {
        restaurantId,
        reservationDate: date,
        reservationTime: {
          [Op.between]: [startTime, endTime]
        },
        status: {
          [Op.notIn]: [ReservationStatus.CANCELLED, ReservationStatus.COMPLETED]
        }
      }
    });
  }
}


