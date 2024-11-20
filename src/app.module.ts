import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@/Database/database.module';
import { CustomersModule } from './Module/customer/customers.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerMiddleware } from './Middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { InternalServerErrorFilter } from './InternalServerErrorFilter';
import { ReservationsModule } from './Module/reservations/reservations.module';
import { RestaurantModule } from './Module/restaurant/restaurant.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './Config/mailer.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async () => mailerConfig,
    }),
    ScheduleModule.forRoot(),

    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),

    DatabaseModule,
    CustomersModule,
    ReservationsModule,
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
