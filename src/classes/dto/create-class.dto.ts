import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ name: 'name', example: 'R4C' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ name: 'year', example: '2' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(9)
  year: number;

  @ApiProperty({
    name: 'subjectListId',
    example: '1d9c9c18-7004-44c8-86f0-247623b41a7d',
  })
  @IsNotEmpty()
  @IsString()
  subjectListId: string;

  @ApiProperty({ name: 'students' })
  @ApiProperty({
    name: 'students',
    example:
      "[{label: '1d9c9c18-7004-44c8-86f0-247623b41a7d', value: 'John Cena'}]",
  })
  students?: { label: string; value: string }[];

  @ApiProperty({
    name: 'classTeacherId',
    example: '1d9c9c18-7004-44c8-86f0-247623b41a7d',
  })
  @IsNotEmpty()
  @IsString()
  classTeacherId: string;

  @ApiProperty({
    name: 'substituteClassTeacherId',
    example: '1d9c9c18-7004-44c8-86f0-247623b41a7d',
  })
  @IsNotEmpty()
  @IsString()
  substituteClassTeacherId: string;
}
