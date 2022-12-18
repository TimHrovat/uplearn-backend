import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({
    name: 'name',
    example: 'R4C',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
