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

  async delete(name: string) {
    return await this.prisma.classroom.delete({ where: { name } });
  }
}
