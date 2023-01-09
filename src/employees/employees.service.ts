import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConnectToSubjectDto } from './dto/connect-to-subject.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger: Logger = new Logger(EmployeesService.name);

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.prisma.employee.create({
      data: createEmployeeDto,
    });

    if (!employee) throw new BadRequestException();

    this.logger.verbose(
      `New employee was created from user ${createEmployeeDto.userId}`,
    );

    return employee;
  }

  async findAll() {
    return await this.prisma.employee.findMany();
  }

  async findUnique(id: string) {
    const employee = await this.prisma.employee.findUnique({ where: { id } });

    if (!employee) throw new BadRequestException();

    return employee;
  }

  async connectToSubject(id: string, connectToSubjectDto: ConnectToSubjectDto) {
    const employee = await this.prisma.employee.update({
      where: { id },
      data: {
        Employee_Subject: {
          create: {
            subject: {
              connect: {
                abbreviation: connectToSubjectDto.subjectAbbreviation,
              },
            },
          },
        },
      },
    });

    if (!employee) throw new BadRequestException();

    return employee;
  }

  async delete(id: string) {
    const employee = await this.prisma.employee.delete({
      where: { id },
    });

    if (!employee) throw new BadRequestException();

    this.logger.verbose(`Employee (${id}) has been deleted`);

    return employee;
  }
}
