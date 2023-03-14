import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchoolYearsService } from 'src/school-years/school-years.service';
import { UsersService } from 'src/users/users.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly schoolYearsService: SchoolYearsService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  private readonly logger: Logger = new Logger(StudentsService.name);

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.prisma.student.create({
      data: createStudentDto,
    });

    if (!student) throw new BadRequestException();

    this.logger.verbose(
      `New student was created from user ${createStudentDto.userId}`,
    );

    return student;
  }

  async findAll() {
    return await this.prisma.student.findMany({
      include: {
        user: {
          select: this.usersService.userSelect,
        },
      },
    });
  }

  async findAllWithoutClass() {
    return await this.prisma.student.findMany({
      where: { class: null },
      include: {
        user: {
          select: this.usersService.userSelect,
        },
      },
    });
  }

  async getByClassAndSubject(className: string, subject: string) {
    const schoolYear = await this.schoolYearsService.getActive();

    if (!schoolYear) throw new BadRequestException('No valid school year');

    return await this.prisma.student.findMany({
      where: {
        className,
      },
      include: {
        Grade: {
          where: {
            AND: [
              { subjectAbbreviation: subject },
              { schoolYearId: schoolYear.id },
            ],
          },
        },
        user: {
          select: this.usersService.userSelect,
        },
      },
    });
  }

  async findUnique(id: string) {
    return await this.prisma.student.findUnique({ where: { id } });
  }

  async getSubjectsWithGrades(id: string) {
    const subjects = await this.prisma.subject.findMany({
      where: {
        Subject_SubjectList: {
          some: {
            subjectList: {
              Class: {
                some: {
                  Student: {
                    some: {
                      id,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const schoolYear = await this.schoolYearsService.getActive();

    if (!schoolYear) throw new BadRequestException('No valid school year');

    const grades = await this.prisma.grade.findMany({
      where: {
        AND: [{ studentId: id }, { schoolYearId: schoolYear.id }],
      },
    });

    subjects.forEach((subject) => {
      const filteredGrades = grades.filter(
        (grade) => grade.subjectAbbreviation === subject.abbreviation,
      );

      subject['grades'] = filteredGrades;
    });

    return subjects;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    });

    if (!student) throw new BadRequestException();

    this.logger.verbose(`Student (${id}) has been updated`);

    return student;
  }

  async removeFromClass(id: string) {
    const student = await this.prisma.student.update({
      where: { id },
      data: {
        className: null,
      },
    });

    return student;
  }

  async delete(id: string) {
    const student = await this.prisma.student.delete({
      where: { id },
    });

    if (!student) throw new BadRequestException();

    this.logger.verbose(`Student (${id}) has been deleted`);

    return student;
  }
}
