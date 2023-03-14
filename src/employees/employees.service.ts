import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AddToSubjectDto } from './dto/add-to-subject.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

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
    return await this.prisma.employee.findMany({
      include: {
        user: {
          select: this.usersService.userSelect,
        },
      },
    });
  }

  async findAllNonClassTeachers() {
    return await this.prisma.employee.findMany({
      where: {
        ClassTeacher: null,
      },
      include: {
        user: {
          select: this.usersService.userSelect,
        },
      },
    });
  }

  async findAllNonSubstituteClassTeachers() {
    return await this.prisma.employee.findMany({
      where: {
        SubstituteClassTeacher: null,
      },
      include: {
        user: {
          select: this.usersService.userSelect,
        },
      },
    });
  }

  async getOngoingLesson(id: string) {
    const date = new Date();

    return await this.prisma.lesson.findFirst({
      where: {
        employeeId: id,
        date: date,
        schoolHour: {
          endTime: {
            gte: date,
          },
          startTime: {
            lte: date,
          },
        },
      },
      include: {
        schoolHour: true,
      },
    });
  }

  async findUnique(id: string) {
    const employee = await this.prisma.employee.findUnique({ where: { id } });

    if (!employee) throw new BadRequestException();

    return employee;
  }

  async findAllNotInSubject(abbr: string) {
    return await this.prisma.employee.findMany({
      where: {
        Employee_Subject: {
          none: {
            subjectAbbreviation: abbr,
          },
        },
      },
      include: {
        user: {
          select: this.usersService.userSelect,
        },
      },
    });
  }

  async removeFromSubject(id: string, abbr: string) {
    return await this.prisma.employee_Subject.delete({
      where: {
        employeeId_subjectAbbreviation: {
          employeeId: id,
          subjectAbbreviation: abbr,
        },
      },
    });
  }

  async addToSubject(addToSubjectDto: AddToSubjectDto) {
    const data: { employeeId: string; subjectAbbreviation: string }[] = [];

    addToSubjectDto.employees.forEach((employee) => {
      data.push({
        employeeId: employee.value,
        subjectAbbreviation: addToSubjectDto.subjectAbbreviation,
      });
    });

    if (data.length === 0) return;

    return await this.prisma.employee_Subject.createMany({
      data: data,
    });
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
