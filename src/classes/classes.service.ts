import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger: Logger = new Logger(ClassesService.name);

  async create(createClassDto: CreateClassDto) {
    const studentConnections: { id: string }[] = [];

    createClassDto.students.forEach((student) => {
      studentConnections.push({ id: student.value });
    });

    console.log(createClassDto);

    const newClass = await this.prisma.class
      .create({
        data: {
          name: createClassDto.name,
          year: createClassDto.year,
          subjectListId: createClassDto.subjectListId,
          classTeacherId: createClassDto.classTeacherId,
          substituteClassTeacherId: createClassDto.substituteClassTeacherId,
          Student: {
            connect: studentConnections,
          },
        },
      })
      .catch(() => {
        throw new BadRequestException({
          cause: 'Something went wrong, please try again later',
        });
      });

    if (!newClass)
      throw new BadRequestException({
        cause: 'Something went wrong, please try again later',
      });

    return newClass;
  }
}
