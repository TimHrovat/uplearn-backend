import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty({ name: 'className', example: 'R4C' })
  @IsNotEmpty()
  @IsString()
  className?: string;
}
