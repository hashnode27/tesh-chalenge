import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersProvider } from './customers.providers';
import { CustomersController } from './customers.controller';

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [CustomersService, ...CustomersProvider],
  exports: [CustomersService],
})
export class CustomersModule {}
