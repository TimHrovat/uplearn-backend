import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectListDto } from './dto/create-subject-list.dto';

@Injectable()
export class SubjectListsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger: Logger = new Logger(SubjectListsService.name);

  async create(createSubjectListDto: CreateSubjectListDto) {
    const createData: { subjectAbbreviation: string }[] = [];

    createSubjectListDto.subjects.forEach((subject) => {
      createData.push({ subjectAbbreviation: subject.value });
    });

    const subjectList = await this.prisma.subjectList
      .create({
        data: {
          name: createSubjectListDto.name,
          Subject_SubjectList: { create: createData },
        },
      })
      .catch(() => {
        throw new BadRequestException({
          cause: 'Something went wrong, please try again later',
        });
      });

    if (!subjectList)
      throw new BadRequestException({
        cause: 'Something went wrong, please try again later',
      });

    return subjectList;
  }

  async findAll() {
    return await this.prisma.subjectList.findMany({
      include: {
        Subject_SubjectList: true,
      },
    });
  }

  async delete(id: string) {
    const subjectListHasClasses = await this.prisma.subjectList.findUnique({
      where: {
        id,
      },
      include: {
        Class: true,
      },
    });

    if (subjectListHasClasses.Class.length !== 0) {
      throw new BadRequestException(
        'Before deleting a subject list you must first remove it from all classes that use it',
      );
    }

    return await this.prisma.subjectList.delete({
      where: {
        id,
      },
    });
  }
}
