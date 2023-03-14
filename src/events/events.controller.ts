import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
@ApiTags('Events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Roles(Role.admin, Role.employee)
  @Post('create')
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventsService.create(createEventDto);
  }

  @Get('events-by-class-and-date-range/:name/:start/:end')
  async getEventsByClassAndDateRange(
    @Param('name') className: string,
    @Param('start') startDate: string,
    @Param('end') endDate: string,
  ) {
    return await this.eventsService.getEventsByClassAndDateRange(
      className,
      startDate,
      endDate,
    );
  }

  @Get('upcoming/:className')
  async getUpcomingEvents(@Param('className') className: string) {
    return await this.eventsService.getUpcomingEvents(className);
  }

  @Get('events-by-employee-and-date-range/:employeeid/:start/:end')
  async getEventsByEmployeeAndDateRange(
    @Param('employeeid') employeeId: string,
    @Param('start') startDate: string,
    @Param('end') endDate: string,
  ) {
    return await this.eventsService.getEventsByEmployeeAndDateRange(
      employeeId,
      startDate,
      endDate,
    );
  }

  @Roles(Role.admin, Role.employee)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.eventsService.delete(id);
  }
}
