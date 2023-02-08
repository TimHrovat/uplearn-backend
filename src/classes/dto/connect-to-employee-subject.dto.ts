import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConnectToEmployeeSubjectDto {
  @ApiProperty({
    name: 'employeeId',
    example: '0f83668c-9f55-45c0-a285-382fac75835f',
  })
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @ApiProperty({ name: 'subjectAbbreviation', example: 'MAT' })
  @IsNotEmpty()
  @IsString()
  subjectAbbreviation: string;
}
