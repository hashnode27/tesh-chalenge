import {  RESERVATION_PROVIDER, RESTAURANT_PROVIDER } from '@/Helpers/contants';
import { Reservation } from './entities/reservations.entities';
import { Restaurant } from '../restaurant/entities/restaurant.entities';

export const ReservationProvider = [
  {
    provide: RESERVATION_PROVIDER,
    useValue: Reservation,
  },
  {
    provide: RESTAURANT_PROVIDER,
    useValue: Restaurant,
  },
];
