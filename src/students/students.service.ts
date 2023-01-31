import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger: Logger = new Logger(StudentsService.name);

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.prisma.student.create({
      data: createStudentDto,
    });

    if (!student) throw new BadRequestException();

    this.logger.verbose(
      `New student was created from user ${createStudentDto.userId}`,
    );

    return student;
  }

  async findAll() {
    return await this.prisma.student.findMany({ include: { user: true } });
  }

  async findAllWithoutClass() {
    return await this.prisma.student.findMany({
      where: { class: null },
      include: { user: true },
    });
  }

  async findUnique(id: string) {
    const student = await this.prisma.student.findUnique({ where: { id } });

    if (!student) throw new BadRequestException();

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    });

    if (!student) throw new BadRequestException();

    this.logger.verbose(`Student (${id}) has been updated`);

    return student;
  }

  async delete(id: string) {
    const student = await this.prisma.student.delete({
      where: { id },
    });

    if (!student) throw new BadRequestException();

    this.logger.verbose(`Student (${id}) has been deleted`);

    return student;
  }
}
