import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateEmployeeGradeDto {
  @ApiProperty({
    name: 'value',
    example: '4',
  })
  @IsNumber()
  @IsNotEmpty()
  value?: number;

  @ApiProperty({
    name: 'comment',
    example: 'this is a comment',
  })
  @IsString()
  @IsNotEmpty()
  comment?: string;
}
