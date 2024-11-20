import { Inject, Injectable } from '@nestjs/common';
import { CUSTOMER_PROVIDER } from '@/Helpers/contants';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_PROVIDER)
    private readonly repository: typeof Customer,
  ) {}
  async findAll(payload) {
    const filter = {};
    return this.repository.findAll({
      where: filter,
      order: [['created_at', 'asc']],
    });
  }
  async create(payload: any) {
    return await this.repository.create(payload);
  }

  async remove(id: number) {
    return await this.repository.destroy({ where: { id } });
  }

  async get(attr = {}) {
    return this.repository.findAll(attr);
  }
  async update(id: number, payload: any) {
    return await this.repository.update(payload, {
      where: { id },
    });
  }
  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id },
    });
  }

}
