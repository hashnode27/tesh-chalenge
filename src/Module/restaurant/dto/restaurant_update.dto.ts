import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantDto } from './restaurant_create.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}