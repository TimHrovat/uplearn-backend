import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEmployeeSubjectDto } from './dto/create-employee-subject.dto';
import { EmployeesSubjectsService } from './employees_subjects.service';

@Controller('employees-subjects')
export class EmployeesSubjectsController {
  constructor(
    private readonly employeesSubjectsService: EmployeesSubjectsService,
  ) {}

  @Post('create')
  async create(@Body() createEmployeeSubjectDto: CreateEmployeeSubjectDto) {
    return this.employeesSubjectsService.create(createEmployeeSubjectDto);
  }

  @Get()
  async findAll() {
    return this.employeesSubjectsService.findAll();
  }

  // @Get(':id')
  // async findUniqueByEmployeeId(@Param('id') id: string) {
  //   return this.employeesSubjectsService.findUniqueByEmployeeId(id);
  // }
}
