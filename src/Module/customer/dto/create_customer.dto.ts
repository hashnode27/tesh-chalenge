// customer.dto.ts
import { IsString, IsEmail, IsOptional, Length, IsPhoneNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John', description: 'Customer first name' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Customer last name' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  last_name: string;

  @ApiProperty({ example: '+62812345678', description: 'Customer phone number' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: 'john.doe@example.com', description: 'Customer email address' })
  @IsOptional()
  @IsEmail()
  @Length(5, 100)
  email?: string;

  @ApiPropertyOptional({ example: 'Jl. Example Street No. 123', description: 'Customer address' })
  @IsOptional()
  @IsString()
  @Length(5, 500)
  address?: string;
}



