import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectManyDto } from './dto/create-subject-many.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger: Logger = new Logger(SubjectsService.name);

  async create(createSubjectDto: CreateSubjectDto) {
    const subject = await this.prisma.subject.create({
      data: createSubjectDto,
    });

    if (!subject) throw new BadRequestException();

    this.logger.verbose(`Subject ${createSubjectDto.abbreviation} was created`);

    return subject;
  }

  async createFromArrayOfObjects(createSubjectManyDto: CreateSubjectManyDto) {
    const { teachers, ...other } = createSubjectManyDto;

    const subject = await this.prisma.subject
      .create({
        data: other,
      })
      .catch(() => {
        throw new BadRequestException({ cause: 'This subject already exists' });
      });

    const formattedTeachers: {
      employeeId: string;
      subjectAbbreviation: string;
    }[] = [];

    teachers.forEach((teacher) => {
      formattedTeachers.push({
        employeeId: teacher.value,
        subjectAbbreviation: other.abbreviation,
      });
    });

    if (!subject) throw new BadRequestException();

    if (teachers.length === 0) return subject;

    const employeeSubject = await this.prisma.employee_Subject.createMany({
      data: formattedTeachers,
    });

    if (!employeeSubject) throw new BadRequestException();

    return subject;
  }

  async w() {
    return await this.prisma.subject.findMany();
  }

  async findUnique(abbreviation: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { abbreviation },
    });

    if (!subject) throw new BadRequestException();

    return subject;
  }

  async update(abbreviation: string, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.prisma.subject.update({
      where: { abbreviation },
      data: updateSubjectDto,
    });

    if (!subject) throw new BadRequestException();

    this.logger.verbose(`Subject ${abbreviation} was updated`);

    return subject;
  }

  async delete(abbreviation: string) {
    const subject = await this.prisma.subject.delete({
      where: { abbreviation },
    });

    if (!subject) throw new BadRequestException();

    this.logger.verbose(`Subject ${abbreviation} was deleted`);

    return subject;
  }
}
