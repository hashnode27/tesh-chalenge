import { Module } from '@nestjs/common';

import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationProvider } from './reservatins.provider';
import { EmailService } from './email.service';

@Module({
  imports: [],
  controllers: [ReservationsController],
  providers: [ReservationsService, EmailService, ...ReservationProvider],
  exports: [ReservationsService],
})
export class ReservationsModule {}
