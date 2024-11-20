import { ReservationStatus } from '@/enums/reservation_status.enum';
import { Customer } from '@/Module/customer/entities/customer.entity';
import { Restaurant } from '@/Module/restaurant/entities/restaurant.entities';
import {
  Column,
  DataType,
  HasMany,
  BelongsTo,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'reservations',
})
export class Reservation extends Model {
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  reservationDate!: Date;
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  reservationTime!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  partySize!: number;

  @Column({
    type: DataType.ENUM(...Object.values(ReservationStatus)),
    defaultValue: ReservationStatus.PENDING,
  })
  status!: ReservationStatus;

  @Column(DataType.TEXT)
  specialRequests: string;

  @ForeignKey(() => Restaurant)
  @Column
  restaurantId!: number;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @ForeignKey(() => Customer)
  @Column
  customerId: number;

  @BelongsTo(() => Customer)
  customer: Customer;
}
