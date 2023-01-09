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
import { ConnectToSubjectDto } from './dto/connect-to-subject.dto';
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
    return this.employeesService.findAll();
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return this.employeesService.findUnique(id);
  }

  @Patch('connect_to_subject/:id')
  async connectToSubject(
    @Param('id') id: string,
    @Body() connectToSubjectDto: ConnectToSubjectDto,
  ) {
    return this.employeesService.connectToSubject(id, connectToSubjectDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.employeesService.delete(id);
  }
}
