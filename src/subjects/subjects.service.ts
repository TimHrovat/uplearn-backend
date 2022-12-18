import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSubjectDto: CreateSubjectDto) {
    try {
      const newSubject = this.prisma.subject.create({ data: createSubjectDto });

      return newSubject;
    } catch (e) {
      console.log(e);
    }
  }

  findAll() {
    return this.prisma.subject.findMany();
  }

  findOne(id: string) {
    return this.prisma.subject.findUnique({ where: { id } });
  }

  update(id: string, updateSubjectDto: UpdateSubjectDto) {
    try {
      const updatedSubject = this.prisma.subject.update({
        where: { id },
        data: updateSubjectDto,
      });

      return updatedSubject;
    } catch (e) {
      console.log(e);
    }
  }

  remove(id: string) {
    return this.prisma.subject.delete({ where: { id } });
  }
}
