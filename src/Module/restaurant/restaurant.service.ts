// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class RestaurantService {}
import { Inject, Injectable } from '@nestjs/common';
import { RESTAURANT_PROVIDER } from '@/Helpers/contants';
import { Restaurant } from './entities/restaurant.entities';


@Injectable()
export class RestaurantService {
  constructor(
    @Inject(RESTAURANT_PROVIDER)
    private readonly repository: typeof Restaurant,
  ) {}
  async findAll(payload) {
    const filter = {};
    return this.repository.findAll({
      where: filter,
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
