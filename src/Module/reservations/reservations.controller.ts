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
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/reservations.dto';

  @Controller('reservations')
  export class ReservationsController {
    private readonly helpers = new Helpers();
    private readonly logger = new Logger(ReservationsController.name);
  
    constructor(private readonly service: ReservationsService) {}
  
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
    async create(@Body() createReservationDto:CreateReservationDto, @Res() res) {
      try {
        const result = await this.service.create(createReservationDto);

        
         return this.helpers.response(
          res,
          HttpStatus.OK,
          RESPONSES.DATA_FOUND,
          result,
        );
        
      } catch (error) {
        return res.status(500).json({ data: null, message: error.message });
      }
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number, @Res() res) {
      return this.helpers.response(res, HttpStatus.OK, RESPONSES.DATA_DELETED, {
        deletedId: id,
      });
    }
  }
  