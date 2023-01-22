import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEmail,
  IsEnum,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    name: 'name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    name: 'surname',
    example: 'Cena',
  })
  @IsNotEmpty()
  @IsString()
  surname?: string;

  @ApiProperty({
    name: 'email',
    example: 'john.cena@uplearn.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty({
    name: 'dateOfBirth',
    example: '2017-07-21T17:32:28Z',
  })
  @IsNotEmpty()
  @IsDate()
  dateOfBirth?: string;

  @ApiProperty({
    name: 'currentPassword',
    example: 'asf2y23/ab77.21',
  })
  @IsString()
  @Length(8, 128)
  currentPassword?: string;

  @ApiProperty({
    name: 'password',
    example: 'asf2y23/ab77.21',
  })
  @Length(8, 128)
  @IsString()
  password?: string;

  @ApiProperty({
    name: 'firstPassword',
    example: 'asf2y23/ab77.21',
  })
  firstPassword?: string;

  @ApiProperty({
    name: 'firstPasswordReplaced',
    example: 'true',
  })
  firstPasswordReplaced?: boolean;

  @ApiProperty({
    name: 'gsm',
    example: '+38640505248',
  })
  @IsString()
  gsm?: string;

  @ApiProperty({
    name: 'role',
    example: 'employee',
  })
  @IsNotEmpty()
  @IsEnum(Role)
  role?: Role;
}
