import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('students')
@ApiTags('Students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('create')
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return this.studentsService.findUnique(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.studentsService.delete(id);
  }
}
