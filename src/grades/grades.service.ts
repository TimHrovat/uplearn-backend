import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchoolYearsService } from 'src/school-years/school-years.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-gradte.dto';

@Injectable()
export class GradesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly schoolYearsService: SchoolYearsService,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    const schoolYear = await this.schoolYearsService.getActive();

    if (!schoolYear) throw new BadRequestException('No valid school year');

    return await this.prisma.grade.create({
      data: {
        ...createGradeDto,
        schoolYearId: schoolYear.id,
      },
    });
  }

  async getByStudent(studentId: string) {
    const schoolYear = await this.schoolYearsService.getActive();

    if (!schoolYear) throw new BadRequestException('No valid school year');

    return await this.prisma.grade.findMany({
      where: {
        AND: [{ studentId: studentId }, { schoolYearId: schoolYear.id }],
      },
    });
  }

  async getByStudentAndSubject(studentId: string, subjectAbbreviation: string) {
    const schoolYear = await this.schoolYearsService.getActive();

    if (!schoolYear) throw new BadRequestException('No valid school year');

    return await this.prisma.grade.findMany({
      where: {
        AND: [
          { studentId: studentId },
          { subjectAbbreviation: subjectAbbreviation },
          { schoolYearId: schoolYear.id },
        ],
      },
    });
  }

  async update(id: string, updateGradeDto: UpdateGradeDto) {
    return await this.prisma.grade.update({
      where: {
        id: id,
      },
      data: updateGradeDto,
    });
  }

  async delete(id: string) {
    return await this.prisma.grade.delete({
      where: {
        id: id,
      },
    });
  }
}
