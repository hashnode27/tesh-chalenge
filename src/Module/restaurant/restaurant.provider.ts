import { RESTAURANT_PROVIDER } from '@/Helpers/contants';
import { Restaurant } from './entities/restaurant.entities';

export const RestaurantProvider = [
  {
    provide: RESTAURANT_PROVIDER,
    useValue: Restaurant,
  },
];
