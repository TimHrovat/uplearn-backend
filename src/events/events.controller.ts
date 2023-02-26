import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.eventsService.delete(id);
  }
}
