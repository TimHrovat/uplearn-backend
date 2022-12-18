import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty({
    name: 'classId',
    example: '3ce64d70-0716-474d-8c2b-9f0d1d9a0b45',
  })
  @IsNotEmpty()
  @IsString()
  classId: string;
}
