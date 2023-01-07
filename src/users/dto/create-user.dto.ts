import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEmail,
  Length,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    name: 'name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'surname',
    example: 'Cena',
  })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({
    name: 'email',
    example: 'john.cena@uplearn.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'dateOfBirth',
    example: '2017-07-21T17:32:28Z',
  })
  @IsNotEmpty()
  @IsDate()
  dateOfBirth: string;

  @ApiProperty({
    name: 'firstPassword',
    example: 'a63Ggvie73pd22j-Gdo',
  })
  @IsNotEmpty()
  @Length(8, 128)
  firstPassword: string;

  @ApiProperty({
    name: 'role',
    example: 'employee',
  })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
