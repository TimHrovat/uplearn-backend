import { ApiProperty } from '@nestjs/swagger';
import { GradeType } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateGradeDto {
  @ApiProperty({
    name: 'value',
    example: '5',
  })
  @IsInt()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    name: 'type',
    example: 'ORAL',
  })
  @IsEnum(GradeType)
  @IsNotEmpty()
  type: GradeType;

  @ApiProperty({
    name: 'description',
    example: 'This is a description',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    name: 'studentId',
    example: '0f83668c-9f55-45c0-a285-382fac75835f',
  })
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    name: 'subjectAbbreviation',
    example: 'MAT',
  })
  @IsString()
  @IsNotEmpty()
  subjectAbbreviation: string;
}
