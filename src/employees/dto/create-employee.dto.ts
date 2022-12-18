import { ApiProperty } from '@nestjs/swagger';
import { EmployeeRole } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEmail,
  Length,
  IsEnum,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    name: 'name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ name: 'surname', example: 'Cena' })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({
    name: 'dateOfBirth',
    example: '2017-07-21T17:32:28Z',
  })
  @IsNotEmpty()
  @IsDate()
  dateOfBirth: string;

  @ApiProperty({
    name: 'email',
    example: 'john.cena@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    example: 'a63Ggvie73pd22j-Gdo',
  })
  @IsNotEmpty()
  @Length(8, 128)
  password: string;

  @ApiProperty({
    name: 'role',
    example: 'teacher',
  })
  @IsNotEmpty()
  @IsEnum(EmployeeRole)
  role: EmployeeRole;
}
