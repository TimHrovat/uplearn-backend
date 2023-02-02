import { ApiProperty } from '@nestjs/swagger';
import { ClassroomType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateClassroomDto {
  @ApiProperty({
    name: 'name',
    example: 'K11',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'type',
    example: 'normal',
  })
  @IsNotEmpty()
  @IsEnum(ClassroomType)
  type: ClassroomType;
}
