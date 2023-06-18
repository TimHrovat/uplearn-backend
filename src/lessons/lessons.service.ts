import {
  BadRequestException,
  Injectable,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { v4 as uuid } from 'uuid';
import { CreateManyLessonsDto } from './dto/create-many-lessons.dto';
import * as moment from 'moment';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LessonsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  private readonly logger: Logger = new Logger(UsersService.name);

  async create(createLessonDto: CreateLessonDto) {
    const teacherAvalible = await this.checkTeacherAvailability(
      createLessonDto.employeeId,
      createLessonDto.substituteEmployeeId,
      createLessonDto.date,
      createLessonDto.schoolHourId,
    );

    if (!teacherAvalible)
      throw new BadRequestException(
        'This teacher already has a class at this time',
      );

    return await this.prisma.lesson.create({ data: createLessonDto });
  }

  async createLessonsForWholeSchoolYear(
    createManyLessonsDto: CreateManyLessonsDto,
  ) {
    const teacherAvalible = await this.checkTeacherAvailabilityWholeSchoolYear(
      createManyLessonsDto.employeeId,
      createManyLessonsDto.substituteEmployeeId,
      createManyLessonsDto.date,
      createManyLessonsDto.schoolHourId,
    );

    if (!teacherAvalible)
      throw new BadRequestException(
        'This teacher already has a class at this time',
      );

    createManyLessonsDto.lessonGroup = uuid();

    const lessons: CreateLessonDto[] = [];
    let date = new Date(createManyLessonsDto.date);
    const endDate = getEndDate(createManyLessonsDto.date);

    while (date < endDate) {
      lessons.push({ ...createManyLessonsDto });
      date = moment(date).add(1, 'week').toDate();
      createManyLessonsDto.date = date.toISOString();
    }

    return await this.prisma.lesson.createMany({ data: lessons });
  }

  private async checkTeacherAvailability(
    employeeId: string | null,
    substituteEmployeeId: string | null,
    reqDate: string,
    schoolHourId: string,
  ) {
    const date = moment(reqDate)
      .utcOffset(0)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toISOString();

    const checkAvalible = await this.prisma.lesson.findMany({
      where: {
        OR: [
          { employeeId: employeeId ?? substituteEmployeeId },
          { substituteEmployeeId: substituteEmployeeId ?? employeeId },
        ],
        AND: [
          { date: { equals: date } },
          {
            schoolHourId: {
              equals: schoolHourId,
            },
          },
        ],
      },
    });

    return checkAvalible.length === 0;
  }

  private async checkTeacherAvailabilityWholeSchoolYear(
    employeeId: string | null,
    substituteEmployeeId: string | null,
    reqDate: string,
    schoolHourId: string,
  ) {
    const date = moment(reqDate)
      .utcOffset(0)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toISOString();

    const checkAvalible = await this.prisma.lesson.findMany({
      where: {
        OR: [
          { employeeId: employeeId ?? substituteEmployeeId },
          { substituteEmployeeId: substituteEmployeeId ?? employeeId },
        ],
        AND: [
          { date: { gte: date } },
          {
            schoolHourId: {
              equals: schoolHourId,
            },
          },
        ],
      },
    });

    return checkAvalible.length === 0;
  }

  async getLessonsByClassAndDateRange(
    className: string,
    startDate: string,
    endDate: string,
  ) {
    return await this.prisma.lesson.findMany({
      where: {
        className,
        date: {
          lte: endDate, // "2022-01-30T00:00:00.000Z"
          gte: startDate, // "2022-01-15T00:00:00.000Z"
        },
      },
      include: {
        employee_Subject: {
          include: {
            employee: {
              include: {
                user: {
                  select: this.usersService.userSelect,
                },
              },
            },
          },
        },
        substituteEmployee: {
          include: {
            user: {
              select: this.usersService.userSelect,
            },
          },
        },
      },
    });
  }

  async getLessonsByEmployeeAndDateRange(
    employeeId: string,
    startDate: string,
    endDate: string,
  ) {
    return await this.prisma.lesson.findMany({
      where: {
        employeeId,
        date: {
          lte: endDate, // "2022-01-30T00:00:00.000Z"
          gte: startDate, // "2022-01-15T00:00:00.000Z"
        },
      },
      include: {
        employee_Subject: {
          include: {
            employee: {
              include: {
                user: {
                  select: this.usersService.userSelect,
                },
              },
            },
          },
        },
        substituteEmployee: {
          include: {
            user: {
              select: this.usersService.userSelect,
            },
          },
        },
      },
    });
  }

  async findMany() {
    return await this.prisma.lesson.findMany();
  }

  async findUnique(id: string) {
    return await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        employee_Subject: {
          include: {
            employee: {
              include: {
                user: {
                  select: this.usersService.userSelect,
                },
              },
            },
            subject: true,
          },
        },
        class: {
          include: {
            Student: {
              include: {
                user: {
                  select: this.usersService.userSelect,
                },
                Absence: {
                  where: {
                    lessonId: id,
                  },
                },
              },
            },
          },
        },
        substituteEmployee: {
          include: {
            user: {
              select: this.usersService.userSelect,
            },
          },
        },
      },
    });
  }

  async getUpcomingGradings(className: string) {
    const currentDate = new Date();

    return await this.prisma.lesson.findMany({
      where: {
        AND: [
          { className },
          { type: 'GRADING' },
          { date: { gte: currentDate.toISOString() } },
        ],
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.lesson.delete({ where: { id } });
  }

  async deleteMany(lessonGroupId: string) {
    const today = new Date();

    return await this.prisma.lesson.deleteMany({
      where: {
        lessonGroup: lessonGroupId,
        date: { gte: today.toISOString() },
      },
    });
  }
}

function getEndDate(startDate: string) {
  let endDate: Date = new Date(startDate);

  if (endDate.getMonth() > 5) {
    endDate = moment(endDate).add(1, 'year').toDate();
  }

  if (endDate.getMonth() === 5 && endDate.getDate() > 24) {
    endDate = moment(endDate).add(1, 'year').toDate();
  }

  endDate.setDate(24);
  endDate.setMonth(5);

  return endDate;
}
