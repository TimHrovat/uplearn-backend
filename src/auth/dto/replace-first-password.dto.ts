import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ReplaceFirstPasswordDto {
  @ApiProperty({
    name: 'newPassword',
    example: 'as-0/123kca2d52',
  })
  @IsString()
  @Length(8, 128)
  password: string;
}
