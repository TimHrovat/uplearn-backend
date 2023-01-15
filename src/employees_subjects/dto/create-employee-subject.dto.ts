import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateEmployeeSubjectDto {
  @ApiProperty({
    name: 'employeeId',
    example: 'eb955ab0-b9e0-4b77-8503-4f95d8d733d7',
  })
  @IsNotEmpty()
  @IsUUID()
  employeeId: string;

  @ApiProperty({ name: 'subjectAbbreviation', example: 'MAT' })
  @IsNotEmpty()
  @MaxLength(5)
  subjectAbbreviation: string;
}
