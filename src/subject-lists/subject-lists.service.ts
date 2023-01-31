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
    return await this.prisma.subjectList.findMany();
  }
}
