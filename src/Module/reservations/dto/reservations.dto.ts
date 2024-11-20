import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ReservationStatus } from '@/enums/reservation_status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReservationDto {
    @ApiProperty({
      description: 'Date of the reservation',
      example: '2024-12-25',
      type: Date
    })
    @IsNotEmpty({ message: 'Reservation date is required' })
    @Type(() => Date)
    @IsDate()
    reservationDate: Date;
  
    @ApiProperty({
      description: 'Time of the reservation (24-hour format)',
      example: '19:30',
      pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
    })
    @IsNotEmpty({ message: 'Reservation time is required' })
    @IsString()
    reservationTime: string;
  
    @ApiProperty({
      description: 'Number of guests in the party',
      minimum: 1,
      example: 4,
      type: Number
    })
    @IsNotEmpty({ message: 'Party size is required' })
    @IsInt()
    @Min(1, { message: 'Party size must be at least 1' })
    partySize: number;
  
    @ApiPropertyOptional({
      description: 'Current status of the reservation',
      enum: ReservationStatus,
      default: ReservationStatus.PENDING,
      example: ReservationStatus.PENDING
    })
    @IsOptional()
    @IsEnum(ReservationStatus, {
      message: 'Status must be PENDING, CONFIRMED, CANCELLED, COMPLETED, or NO_SHOW'
    })
    status?: ReservationStatus = ReservationStatus.PENDING;
  
    @ApiPropertyOptional({
      description: 'Any special requests or notes for the reservation',
      example: 'Window seat preferred, Birthday celebration',
      maxLength: 500
    })
    @IsOptional()
    @IsString()
    specialRequests?: string;
  
    @ApiProperty({
      description: 'ID of the restaurant',
      example: 1,
      type: Number
    })
    @IsNotEmpty({ message: 'Restaurant ID is required' })
    @IsInt()
    restaurantId: number;
  
    @ApiProperty({
      description: 'ID of the customer making the reservation',
      example: 1,
      type: Number
    })
    @IsNotEmpty({ message: 'Customer ID is required' })
    @IsInt()
    customerId: number;
  }
export class UpdateReservationDto {
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    reservationDate?: Date;
  
    @IsOptional()
    @IsString()
    reservationTime?: string;
  
    @IsOptional()
    @IsInt()
    @Min(1)
    partySize?: number;
  
    @IsOptional()
    @IsEnum(ReservationStatus, {
      message: 'Status must be either PENDING, CONFIRMED, CANCELLED, or COMPLETED'
    })
    status?: ReservationStatus;
  
    @IsOptional()
    @IsString()
    specialRequests?: string;
  
    @IsOptional()
    @IsInt()
    restaurantId?: number;
  
    @IsOptional()
    @IsInt()
    customerId?: number;
  }
  

