import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeGradeDto } from './dto/create-employee-grade.dto';
import { UpdateEmployeeGradeDto } from './dto/update-employee-grade.dto';

@Injectable()
export class EmployeeGradesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeGradeDto: CreateEmployeeGradeDto) {
    return await this.prisma.employeeGrade.create({
      data: createEmployeeGradeDto,
    });
  }

  async getByStudent(studentId: string) {
    return await this.prisma.employeeGrade.findMany({
      where: {
        studentId: studentId,
      },
    });
  }

  async getByEmployee(employeeId: string) {
    const grades = await this.prisma.employeeGrade.findMany({
      where: {
        employeeId: employeeId,
      },
      select: {
        comment: true,
        value: true,
      },
    });

    const avg = await this.prisma.employeeGrade.aggregate({
      where: {
        employeeId: employeeId,
      },
      _avg: {
        value: true,
      },
    });

    return { avg: avg._avg.value, grades };
  }

  async update(id: string, updateEmployeeGradeDto: UpdateEmployeeGradeDto) {
    return await this.prisma.employeeGrade.update({
      where: {
        id,
      },
      data: updateEmployeeGradeDto,
    });
  }
}
