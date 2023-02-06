import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSchoolHourDto } from './dto/create-school-hour.dto';
import * as mm from 'moment';
import { extendMoment } from 'moment-range';
import { UpdateSchoolHourDto } from './dto/update-school-hour.dto';

const moment = extendMoment(mm);

@Injectable()
export class SchoolHoursService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger: Logger = new Logger(PrismaService.name);

  async create(createSchoolHourDto: CreateSchoolHourDto) {
    const endTime = this.endTimeFromStartTime(createSchoolHourDto.startTime);

    const dateStartTime = this.format(createSchoolHourDto.startTime);
    const dateEndTime = this.format(endTime);

    const schoolHours = await this.findMany();

    schoolHours.forEach((schoolHour) => {
      let schoolHourStartTime = new Date(schoolHour.startTime);
      let schoolHourEndTime = new Date(schoolHour.endTime);

      schoolHourStartTime = moment(schoolHourStartTime)
        .subtract(5, 'm')
        .toDate();
      schoolHourEndTime = moment(schoolHourEndTime).add(5, 'm').toDate();

      const schoolHourRange = moment.range(
        schoolHourStartTime,
        schoolHourEndTime,
      );

      const dateRange = moment.range(dateStartTime, dateEndTime);

      if (schoolHourRange.overlaps(dateRange)) {
        throw new BadRequestException(
          'School Hours Cannot overlap and must have at least 5min breaks',
        );
      }
    });

    return await this.prisma.schoolHour.create({
      data: {
        startTime: dateStartTime.toISOString(),
        endTime: dateEndTime.toISOString(),
      },
    });
  }

  async update(id: string, updateSchoolHourDto: UpdateSchoolHourDto) {
    const endTime = this.endTimeFromStartTime(updateSchoolHourDto.startTime);

    const dateStartTime = this.format(updateSchoolHourDto.startTime);
    const dateEndTime = this.format(endTime);

    const schoolHours = await this.prisma.schoolHour.findMany({
      where: { id: { not: id } },
    });

    schoolHours.forEach((schoolHour) => {
      let schoolHourStartTime = new Date(schoolHour.startTime);
      let schoolHourEndTime = new Date(schoolHour.endTime);

      schoolHourStartTime = moment(schoolHourStartTime)
        .subtract(5, 'm')
        .toDate();
      schoolHourEndTime = moment(schoolHourEndTime).add(5, 'm').toDate();

      const schoolHourRange = moment.range(
        schoolHourStartTime,
        schoolHourEndTime,
      );

      const dateRange = moment.range(dateStartTime, dateEndTime);

      if (schoolHourRange.overlaps(dateRange)) {
        throw new BadRequestException(
          'School Hours Cannot overlap and must have at least 5min breaks',
        );
      }
    });

    return await this.prisma.schoolHour.update({
      where: {
        id,
      },
      data: {
        startTime: dateStartTime.toISOString(),
        endTime: dateEndTime.toISOString(),
      },
    });
  }

  async findMany() {
    return await this.prisma.schoolHour.findMany({
      orderBy: { startTime: 'asc' },
    });
  }

  async delete(id: string) {
    return await this.prisma.schoolHour.delete({ where: { id } });
  }

  private endTimeFromStartTime(startTime: string) {
    const splitStartTime = startTime.split(':');

    let minutes = Number(splitStartTime[1]);
    let hours = Number(splitStartTime[0]);

    if (minutes + 45 > 60) {
      minutes = minutes - 15;
      hours = hours + 1;
    } else {
      minutes = minutes + 45;
    }

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    const endTime = formattedHours + ':' + formattedMinutes + ':00';

    return endTime;
  }

  private format(time: string) {
    const splitTime = time.split(':');

    return new Date(1970, 0, 1, Number(splitTime[0]), Number(splitTime[1]));
  }
}
