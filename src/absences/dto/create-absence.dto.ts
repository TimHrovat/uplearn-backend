import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAbsenceDto {
  @ApiProperty({
    name: 'lessonId',
    example: '0f83668c-9f55-45c0-a285-382fac75835f',
  })
  @IsString()
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty({
    name: 'studentId',
    example: '0f83668c-9f55-45c0-a285-382fac75835f',
  })
  @IsString()
  @IsNotEmpty()
  studentId: string;
}
