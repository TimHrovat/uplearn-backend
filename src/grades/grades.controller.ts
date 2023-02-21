import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateGradeDto } from './dto/create-grade.dto';
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
}
