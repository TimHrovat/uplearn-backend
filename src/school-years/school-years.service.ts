import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchoolYearsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCurrent() {
    return await this.prisma.schoolYear.create({
      data: {
        startDate: getStartDate().toISOString(),
        endDate: getEndDate().toISOString(),
      },
    });
  }

  async getActive() {
    const currentDate = new Date();

    const active = await this.prisma.schoolYear.findFirst({
      where: {
        AND: [
          {
            startDate: {
              lte: currentDate.toISOString(),
            },
          },
          {
            endDate: {
              gte: currentDate.toISOString(),
            },
          },
        ],
      },
    });

    if (!active) {
      return await this.createCurrent();
    }

    return active;
  }
}

function getStartDate() {
  let startDate: Date = new Date();

  if (startDate.getMonth() < 8) {
    startDate = moment(startDate).subtract(1, 'year').toDate();
  }

  startDate.setDate(1);
  startDate.setMonth(8);

  return startDate;
}

function getEndDate() {
  let endDate: Date = new Date();

  if (endDate.getMonth() > 7) {
    endDate = moment(endDate).add(1, 'year').toDate();
  }

  if (endDate.getMonth() === 7 && endDate.getDate() > 31) {
    endDate = moment(endDate).add(1, 'year').toDate();
  }

  endDate.setMonth(7);
  endDate.setDate(31);

  return endDate;
}
