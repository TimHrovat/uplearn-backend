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
import { AddToSubjectDto } from './dto/add-to-subject.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
@ApiTags('Employees')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Roles(Role.admin)
  @Post('create')
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeesService.create(createEmployeeDto);
  }

  @Roles(Role.admin)
  @Patch('add-to-subject')
  async addToSubject(@Body() addToSubjectDto: AddToSubjectDto) {
    return await this.employeesService.addToSubject(addToSubjectDto);
  }

  @Get()
  async findAll() {
    return await this.employeesService.findAll();
  }

  @Get('ongoing-lesson/:id')
  async getOngoingLesson(@Param('id') id: string) {
    return await this.employeesService.getOngoingLesson(id);
  }

  @Get('non-class-teachers')
  async findAllNonClassTeachers() {
    return await this.employeesService.findAllNonClassTeachers();
  }

  @Get('non-substitute-class-teachers')
  async findAllNonSubstituteClassTeachers() {
    return await this.employeesService.findAllNonSubstituteClassTeachers();
  }

  @Get('not-in-subject/:abbr')
  async findAllNotInSubject(@Param('abbr') abbr: string) {
    return await this.employeesService.findAllNotInSubject(abbr);
  }

  @Roles(Role.admin)
  @Patch('remove-from-subject/:id/:abbr')
  async removeFromClass(@Param('id') id: string, @Param('abbr') abbr: string) {
    return await this.employeesService.removeFromSubject(id, abbr);
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return await this.employeesService.findUnique(id);
  }

  @Roles(Role.admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.employeesService.delete(id);
  }
}
