import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';

@Injectable()
export class ClassroomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClassroomDto: CreateClassroomDto) {
    return await this.prisma.classroom.create({ data: createClassroomDto });
  }

  async findMany() {
    return await this.prisma.classroom.findMany();
  }

  async findManyWhereNotInLesson(date: string, schoolHourId: string) {
    return await this.prisma.classroom.findMany({
      where: {
        Lesson: {
          none: {
            date: date,
            schoolHourId: schoolHourId,
          },
        },
      },
    });
  }

  async delete(name: string) {
    return await this.prisma.classroom.delete({ where: { name } });
  }
}
