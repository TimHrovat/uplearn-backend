import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSubjectManyDto {
  @ApiProperty({ name: 'abbreviation', example: 'MAT' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  abbreviation: string;

  @ApiProperty({ name: 'name', example: 'Mathematics' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'description',
    example: 'In this class we learn about mathematics.',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    name: 'teachers',
    example:
      "[{label: 'John Cena', value: '241e69de-ca5c-426f-85fe-31feca17e86e'}]",
  })
  teachers?: { label: string; value: string }[];
}
