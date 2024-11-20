import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsInt,
  Min,
  Matches,
  IsOptional
} from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'Name of the restaurant',
    example: 'The Italian Place',
    minLength: 2,
    maxLength: 100
  })
  @IsNotEmpty({ message: 'Restaurant name is required' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Physical address of the restaurant',
    example: 'Jl.Kebayoran lama, jakarta 40617',
    maxLength: 255
  })
  @IsNotEmpty({ message: 'Address is required' })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+6281232121367'
  })
  @IsPhoneNumber(null, { message: 'Please provide a valid phone number' })
  phone: string;

  @ApiPropertyOptional({
    description: 'Type of cuisine served',
    example: 'Italian',
    maxLength: 50
  })
  @IsOptional()
  @IsString()
  cuisineType: string;

  @ApiProperty({
    description: 'Total number of tables available',
    example: 20,
    minimum: 1
  })
  @IsInt()
  @Min(1, { message: 'Total tables must be at least 1' })
  totalTables: number;

  @ApiProperty({
    description: 'Restaurant opening time (24-hour format)',
    example: '09:00',
    pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
  })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Opening time must be in 24-hour format (HH:mm)'
  })
  openingTime: string;

  @ApiProperty({
    description: 'Restaurant closing time (24-hour format)',
    example: '22:00',
    pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
  })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Closing time must be in 24-hour format (HH:mm)'
  })
  closingTime: string;
}
