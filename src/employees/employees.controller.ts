import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
@ApiTags('Employees')
@UseGuards(JwtAuthGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('create')
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  async findAll() {
    return await this.employeesService.findAll();
  }

  @Get('non-class-teachers')
  async findAllNonClassTeachers() {
    return await this.employeesService.findAllNonClassTeachers();
  }

  @Get('non-substitute-class-teachers')
  async findAllNonSubstituteClassTeachers() {
    return await this.employeesService.findAllNonSubstituteClassTeachers();
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return await this.employeesService.findUnique(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.employeesService.delete(id);
  }
}
