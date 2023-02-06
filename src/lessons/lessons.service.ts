import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
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
      },
    });
  }

  async findMany() {
    return await this.prisma.lesson.findMany();
  }
}
