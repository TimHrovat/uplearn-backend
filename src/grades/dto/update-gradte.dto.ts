import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateGradeDto {
  @ApiProperty({
    name: 'value',
    example: '5',
  })
  @IsInt()
  @IsNotEmpty()
  value: number;
}
