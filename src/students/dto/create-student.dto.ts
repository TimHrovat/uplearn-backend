import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    name: 'userId',
    example: '0f83668c-9f55-45c0-a285-382fac75835f',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ name: 'className', example: 'R4C' })
  @IsNotEmpty()
  @IsString()
  className?: string;
}
