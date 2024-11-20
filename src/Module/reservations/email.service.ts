import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Reservation } from './entities/reservations.entities';


@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendReservationConfirmation(reservation: Reservation): Promise<void> {
    try {        
      await this.mailerService.sendMail({
        to: reservation.customer.email,
        subject: `Konfirmasi Reservasi #${reservation.id}`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Reservation Confirmation</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                border-radius: 5px;
              }
              .details {
                margin: 20px 0;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                padding: 20px;
                background-color: #f8f9fa;
                border-radius: 5px;
              }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Reservation Confirmation</h1>
                </div>
                
                <div class="details">
                    <p>Dear ${reservation.customer.first_name + " " +reservation.customer.last_name},</p>
                    <p>Your reservation has been confirmed with the following details:</p>
                    <ul>
                        <li><strong>Reservation ID:</strong> ${reservation.id}</li>
                        <li><strong>Date:</strong> ${reservation.reservationDate}</li>
                        <li><strong>Time:</strong> ${reservation.reservationTime}</li>
                        <li><strong>Number of People:</strong> ${reservation.partySize}</li>
                    </ul>
                </div>

                <div class="footer">
                    <p>Thank you for choosing our service!</p>
                    <p>If you have any questions, please don't hesitate to contact us.</p>
                </div>
            </div>
        </body>
        </html>
      `,
        context: {
          userName: reservation.customer.first_name + " " + reservation.customer.last_name,
          reservationId: reservation.id,
          date: new Date(reservation.reservationDate).toLocaleDateString('id-ID'),
          time: reservation.reservationTime,
          status: reservation.status,
        },
      });

    } catch (error) {
      console.error('Failed to send reservation email:', error);
      throw new Error('Failed to send reservation confirmation email');
    }
  }
}

