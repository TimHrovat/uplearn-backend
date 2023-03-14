import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const { classes, employees, ...other } = createEventDto;

    const event = await this.prisma.event.create({
      data: other,
    });

    const eventEmployeeData: { eventId: string; employeeId: string }[] = [];

    employees.forEach((employee) => {
      eventEmployeeData.push({ employeeId: employee, eventId: event.id });
    });

    await this.prisma.event_Employee.createMany({
      data: eventEmployeeData,
    });

    const eventClassData: { eventId: string; className: string }[] = [];

    classes.forEach((cName) => {
      eventClassData.push({ className: cName, eventId: event.id });
    });

    await this.prisma.event_Class.createMany({
      data: eventClassData,
    });

    return event;
  }

  async getEventsByClassAndDateRange(
    className: string,
    startDate: string,
    endDate: string,
  ) {
    return await this.prisma.event.findMany({
      where: {
        Event_Class: {
          some: {
            className,
          },
        },
        date: {
          lte: endDate, // "2022-01-30T00:00:00.000Z"
          gte: startDate, // "2022-01-15T00:00:00.000Z"
        },
      },
      include: {
        Event_Class: {
          include: {
            class: true,
          },
        },
        Event_Teacher: {
          include: {
            employee: {
              include: {
                user: {
                  select: this.usersService.userSelect,
                },
              },
            },
          },
        },
      },
    });
  }

  async getEventsByEmployeeAndDateRange(
    employeeId: string,
    startDate: string,
    endDate: string,
  ) {
    return await this.prisma.event.findMany({
      where: {
        Event_Teacher: {
          some: {
            employeeId,
          },
        },
        date: {
          lte: endDate, // "2022-01-30T00:00:00.000Z"
          gte: startDate, // "2022-01-15T00:00:00.000Z"
        },
      },
      include: {
        Event_Class: {
          include: {
            class: true,
          },
        },
        Event_Teacher: {
          include: {
            employee: {
              include: {
                user: {
                  select: this.usersService.userSelect,
                },
              },
            },
          },
        },
      },
    });
  }

  async getUpcomingEvents(className: string) {
    const currentDate = new Date();

    return await this.prisma.event.findMany({
      where: {
        AND: [
          {
            Event_Class: {
              some: {
                className,
              },
            },
          },
          { date: { gte: currentDate.toISOString() } },
        ],
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.event.delete({
      where: {
        id,
      },
    });
  }
}
