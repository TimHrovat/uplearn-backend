import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async create({ name }: CreateClassDto) {
    try {
      const newClass = await this.prisma.class.create({
        data: { name },
      });

      return newClass;
    } catch (e) {
      console.log(e); //!fix this
    }
  }

  findAll() {
    return this.prisma.class.findMany();
  }

  findOne(id: string) {
    return this.prisma.class.findUnique({ where: { id } });
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    try {
      const updatedClass = await this.prisma.class.update({
        where: { id },
        data: updateClassDto,
      });

      return updatedClass;
    } catch (e) {
      console.log(e); //!fix this
    }
  }

  remove(id: string) {
    return this.prisma.class.delete({ where: { id } });
  }
}
