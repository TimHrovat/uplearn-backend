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
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('students')
@ApiTags('Students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Roles(Role.admin)
  @Post('create')
  async create(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll() {
    return await this.studentsService.findAll();
  }

  @Get('without-class')
  async findAllWithoutClass() {
    return await this.studentsService.findAllWithoutClass();
  }

  @Get('class-subject/:className/:subject')
  async getByClassAndSubject(
    @Param('className') className: string,
    @Param('subject') subject: string,
  ) {
    return await this.studentsService.getByClassAndSubject(className, subject);
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return await this.studentsService.findUnique(id);
  }

  @Get('subjects-and-grades/:id')
  async getSubjectsWithGrades(@Param('id') id: string) {
    return await this.studentsService.getSubjectsWithGrades(id);
  }

  @Roles(Role.admin)
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentsService.update(id, updateStudentDto);
  }

  @Roles(Role.admin)
  @Patch('remove-from-class/:id')
  async removeFromClass(@Param('id') id: string) {
    return await this.studentsService.removeFromClass(id);
  }

  @Roles(Role.admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.studentsService.delete(id);
  }
}
