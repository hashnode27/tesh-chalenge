import { CUSTOMER_PROVIDER } from '@/Helpers/contants';
import { Customer } from './entities/customer.entity';

export const CustomersProvider = [
  {
    provide: CUSTOMER_PROVIDER,
    useValue: Customer,
  },
];
