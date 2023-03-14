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
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-gradte.dto';
import { GradesService } from './grades.service';

@Controller('grades')
@ApiTags('Grades')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Roles(Role.admin, Role.employee)
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

  @Roles(Role.admin, Role.employee)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGradeDto: UpdateGradeDto,
  ) {
    return await this.gradesService.update(id, updateGradeDto);
  }

  @Roles(Role.admin, Role.employee)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.gradesService.delete(id);
  }
}
