import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-gradte.dto';
import { GradesService } from './grades.service';

@Controller('grades')
@ApiTags('Grades')
@UseGuards(JwtAuthGuard)
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post('create')
  async create(@Body() createGradeDto: CreateGradeDto) {
    return await this.gradesService.create(createGradeDto);
  }

  @Get('student-subject/:student/:subject')
  async getByStudentAndSubject(
    @Param('student') student: string,
    @Param('subject') subject: string,
  ) {
    return await this.gradesService.getByStudentAndSubject(student, subject);
  }

  @Get('student/:student')
  async getByStudent(@Param('student') student: string) {
    return await this.gradesService.getByStudent(student);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGradeDto: UpdateGradeDto,
  ) {
    return await this.gradesService.update(id, updateGradeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.gradesService.delete(id);
  }
}
