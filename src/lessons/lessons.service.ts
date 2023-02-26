import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { v4 as uuid } from 'uuid';
import { CreateManyLessonsDto } from './dto/create-many-lessons.dto';
import * as moment from 'moment';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    const checkTeachers = await this.prisma.employee.findMany({
      where: {
        AND: [
          {
            id:
              createLessonDto.employeeId ??
              createLessonDto.substituteEmployeeId,
          },
          {
            OR: [
              {
                Employee_Subject: {
                  some: {
                    Employee_Subject_Class: {
                      some: {
                        class: {
                          Lesson: {
                            some: {
                              date: { equals: createLessonDto.date },
                              schoolHourId: {
                                equals: createLessonDto.schoolHourId,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              {
                SubstituteLesson: {
                  some: {
                    date: { equals: createLessonDto.date },
                    schoolHourId: {
                      equals: createLessonDto.schoolHourId,
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    });

    if (checkTeachers.length !== 0)
      throw new BadRequestException(
        'This teacher already has a class at this time',
      );

    return await this.prisma.lesson.create({ data: createLessonDto });
  }

  async createLessonsForWholeSchoolYear(
    createManyLessonsDto: CreateManyLessonsDto,
  ) {
    const checkTeachers = await this.prisma.employee.findMany({
      where: {
        AND: [
          {
            id:
              createManyLessonsDto.employeeId ??
              createManyLessonsDto.substituteEmployeeId,
          },
          {
            OR: [
              {
                Employee_Subject: {
                  some: {
                    Employee_Subject_Class: {
                      some: {
                        class: {
                          Lesson: {
                            some: {
                              date: { equals: createManyLessonsDto.date },
                              schoolHourId: {
                                equals: createManyLessonsDto.schoolHourId,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              {
                SubstituteLesson: {
                  some: {
                    date: { equals: createManyLessonsDto.date },
                    schoolHourId: {
                      equals: createManyLessonsDto.schoolHourId,
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    });

    if (checkTeachers.length !== 0)
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
                user: true,
              },
            },
          },
        },
        substituteEmployee: {
          include: {
            user: true,
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
                user: true,
              },
            },
          },
        },
        substituteEmployee: {
          include: {
            user: true,
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
                user: true,
              },
            },
            subject: true,
          },
        },
        class: {
          include: {
            Student: {
              include: {
                user: true,
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
            user: true,
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
