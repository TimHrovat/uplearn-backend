import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class ConnectToSubjectDto {
  @ApiProperty({ name: 'subjectAbbreviation', example: 'MAT' })
  @IsNotEmpty()
  @MaxLength(5)
  subjectAbbreviation: string;
}
