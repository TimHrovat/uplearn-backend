import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateEmployeeGradeDto {
  @ApiProperty({
    name: 'value',
    example: '4',
  })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    name: 'comment',
    example: 'this is a comment',
  })
  @IsString()
  @IsNotEmpty()
  comment?: string;

  @ApiProperty({
    name: 'employeeId',
    example: '0f83668c-9f55-45c0-a285-382fac75835f',
  })
  @IsNotEmpty()
  @IsUUID()
  employeeId: string;

  @ApiProperty({
    name: 'studentId',
    example: '0f83668c-9f55-45c0-a285-382fac75835f',
  })
  @IsNotEmpty()
  @IsUUID()
  studentId: string;
}
