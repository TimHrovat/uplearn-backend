import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    name: 'abbreviation',
    example: 'MAT',
  })
  @IsNotEmpty()
  @IsString()
  abbreviation: string;

  @ApiProperty({
    name: 'name',
    example: 'mathematics',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'description',
    example: 'In this class we learn about numbers...',
  })
  @IsString()
  description?: string;
}
