import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddToSubjectDto {
  @ApiProperty({
    name: 'employees',
    example:
      "[{label: '1d9c9c18-7004-44c8-86f0-247623b41a7d', value: 'John Cena'}]",
  })
  employees?: { label: string; value: string }[];

  @ApiProperty({
    name: 'subjectAbbreviation',
    example: 'MAT',
  })
  @IsString()
  @IsNotEmpty()
  subjectAbbreviation: string;
}
