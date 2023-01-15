import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeSubjectDto } from './dto/create-employee-subject.dto';

@Injectable()
export class EmployeesSubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger: Logger = new Logger(EmployeesSubjectsService.name);

  async create(createEmployeeSubjectDto: CreateEmployeeSubjectDto) {
    const employeeSubject = await this.prisma.employee_Subject.create({
      data: createEmployeeSubjectDto,
    });

    if (!employeeSubject) throw new BadRequestException();

    this.logger.verbose(
      `Employee ${createEmployeeSubjectDto.employeeId} connected to subject ${createEmployeeSubjectDto.subjectAbbreviation}`,
    );

    return employeeSubject;
  }

  async findAll() {
    return this.prisma.employee_Subject.findMany();
  }

  // async findUniqueByEmployeeId(id: string) {
  //   const employeeSubject = await this.prisma.employee_Subject.findUnique({
  //     where: { employeeId: id },
  //   });
  // }
}
