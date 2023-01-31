import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectListDto {
  @ApiProperty({ name: 'name', example: '4. letnik' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'subjects',
    example: "[{label: 'MAT', value: 'MAT'}]",
  })
  subjects?: { label: string; value: string }[];
}
