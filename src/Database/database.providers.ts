import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '@/Helpers/contants';
import { Customer } from '@/Module/customer/entities/customer.entity';
import { Reservation } from '@/Module/reservations/entities/reservations.entities';
import { Restaurant } from '@/Module/restaurant/entities/restaurant.entities';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }

      const sequelize = new Sequelize(config);

      sequelize.addModels([Customer, Reservation, Restaurant]);

      await sequelize.sync({
        force: true,
      });
      return sequelize;
    },
  },
];
