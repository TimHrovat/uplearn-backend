import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchoolYearsService } from 'src/school-years/school-years.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';

@Injectable()
export class AbsencesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly schoolYearsService: SchoolYearsService,
  ) {}

  async create(createAbsenceDto: CreateAbsenceDto) {
    const schoolYear = await this.schoolYearsService.getActive();

    if (!schoolYear) throw new BadRequestException('No valid school year');

    return await this.prisma.absence.create({
      data: { ...createAbsenceDto, schoolYearId: schoolYear.id },
    });
  }

  async delete(id: string) {
    return await this.prisma.absence.delete({
      where: { id: id },
    });
  }
}
