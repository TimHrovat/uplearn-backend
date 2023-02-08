import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({
    name: 'description',
    example: 'In this class we will be doing maths',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    name: 'date',
    example: '2023-02-10T11:34:59.177Z',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    name: 'type',
    example: 'NORMAL',
  })
  @IsNotEmpty()
  @IsEnum(LessonType)
  type: LessonType;

  @ApiProperty({
    name: 'employeeId',
    example: '0f83668c-9f55-45c0-a285-382fac75835f',
  })
  @IsNotEmpty()
  @IsString()
  employeeId?: string;

  @ApiProperty({ name: 'subjectAbbreviation', example: 'MAT' })
  @IsNotEmpty()
  @IsString()
  subjectAbbreviation?: string;

  @ApiProperty({ name: 'className', example: 'R4C' })
  @IsNotEmpty()
  @IsString()
  className: string;

  @ApiProperty({ name: 'classroomName', example: 'K11' })
  @IsNotEmpty()
  @IsString()
  classroomName: string;

  @ApiProperty({
    name: 'substituteEmployeeId',
    example: '0f83668c-9f55-45c0-a285-382fac75835f',
  })
  @IsNotEmpty()
  @IsString()
  substituteEmployeeId?: string;

  @ApiProperty({
    name: 'schoolHourId',
    example: '0f83668c-9f55-45c0-a285-382fac75835f',
  })
  @IsNotEmpty()
  @IsString()
  schoolHourId: string;
}
