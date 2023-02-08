import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

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

  async findMany() {
    return await this.prisma.lesson.findMany();
  }
}
