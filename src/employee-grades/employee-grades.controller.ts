import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateEmployeeGradeDto } from './dto/create-employee-grade.dto';
import { UpdateEmployeeGradeDto } from './dto/update-employee-grade.dto';
import { EmployeeGradesService } from './employee-grades.service';

@Controller('employee-grades')
@ApiTags('Employee Grades')
@UseGuards(JwtAuthGuard)
export class EmployeeGradesController {
  constructor(private readonly employeeGradesService: EmployeeGradesService) {}

  @Post('create')
  async create(@Body() createEmployeeGradeDto: CreateEmployeeGradeDto) {
    return await this.employeeGradesService.create(createEmployeeGradeDto);
  }

  @Get('by-student/:studentId')
  async getByStudent(@Param('studentId') studentId: string) {
    return await this.employeeGradesService.getByStudent(studentId);
  }

  @Get('by-employee/:employeeId')
  async getByEmployee(@Param('employeeId') employeeId: string) {
    return await this.employeeGradesService.getByEmployee(employeeId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeGradeDto: UpdateEmployeeGradeDto,
  ) {
    return await this.employeeGradesService.update(id, updateEmployeeGradeDto);
  }
}
