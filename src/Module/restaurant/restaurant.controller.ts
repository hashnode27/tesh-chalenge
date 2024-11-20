import {
    Controller,
    Get,
    Param,
    HttpStatus,
    Res,
    Req,
    Body,
    Delete,
    Post,
    Put,
    UseInterceptors,
    Logger,
  } from '@nestjs/common';
  
  
  import Helpers from '@/Helpers/helpers';
  import { RESPONSES } from '@/Helpers/contants';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/restaurant_create.dto';
import { UpdateRestaurantDto } from './dto/restaurant_update.dto';

  
  @Controller('restaurant')
  export class RestaurantController {
    private readonly helpers = new Helpers();
    private readonly logger = new Logger(RestaurantController.name);
  
    constructor(private readonly service: RestaurantService) {}
  
    @Get()
    async findAll(@Res() res, @Req() req) {
      const payload = req.query;
      const result = await this.service.findAll(payload);
      if (result.length < 1) {
        return this.helpers.response(
          res,
          HttpStatus.NOT_FOUND,
          RESPONSES.DATA_NOTFOUND,
          result,
        );
      }
  
      return this.helpers.response(
        res,
        HttpStatus.OK,
        RESPONSES.DATA_FOUND,
        result,
      );
    }
  
    @Post()
    async create(@Body() createRestaurantDto:CreateRestaurantDto, @Res() res) {
      try {
        const data = await this.service.create(createRestaurantDto);
        return this.helpers.response(
            res,
            HttpStatus.OK,
            RESPONSES.DATA_FOUND,
            data,
          );
      } catch (error) {
        const result = { data: null, message: error.message }
        return this.helpers.response(
            res,
            HttpStatus.BAD_REQUEST,
            RESPONSES.DATA_NOTFOUND,
            result,
          );
      }
    }
    @Put(':id')
  async update(@Param('id') id: number, @Body() UpdateCustomerDto: UpdateRestaurantDto, @Res() res) {
    const data = await this.service.findOne(id);
    if (data === null) {
      return res.status(404).json({ data, message: 'Data not found' });
    }

    await this.service.update(+id, UpdateCustomerDto);

    return res.status(200).json({ data: null });
  }
    @Delete(':id')
    async remove(@Param('id') id: number, @Res() res) {
      return this.helpers.response(res, HttpStatus.OK, RESPONSES.DATA_DELETED, {
        deletedId: id,
      });
    }
  }
  