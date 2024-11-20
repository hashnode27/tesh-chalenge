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
  Logger,
} from '@nestjs/common';

import { CustomersService } from './customers.service';

import Helpers from '@/Helpers/helpers';
import { RESPONSES } from '@/Helpers/contants';
import { CreateCustomerDto } from './dto/create_customer.dto';
import { UpdateCustomerDto } from './dto/update_customer';

@Controller('customers')
export class CustomersController {
  private readonly helpers = new Helpers();
  private readonly logger = new Logger(CustomersController.name);

  constructor(private readonly service: CustomersService) {}

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
  async create(@Body() customerDto:CreateCustomerDto, @Res() res) {
    try {
      const data = await this.service.create(customerDto);
      return res.status(200).json({
        data: {
          data: data,
        },
      });
    } catch (error) {
      return res.status(500).json({ data: null, message: error.message });
    }
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() UpdateCustomerDto: UpdateCustomerDto, @Res() res) {
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
