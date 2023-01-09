import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateSubjectDto {
  @ApiProperty({ name: 'abbreviation', example: 'MAT' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  abbreviation?: string;

  @ApiProperty({ name: 'name', example: 'Mathematics' })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    name: 'description',
    example: 'In this class we learn about mathematics.',
  })
  @IsString()
  description?: string;
}
