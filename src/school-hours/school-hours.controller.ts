import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSchoolHourDto } from './dto/create-school-hour.dto';
import { SchoolHoursService } from './school-hours.service';

@Controller('school-hours')
@ApiTags('School Hours')
export class SchoolHoursController {
  constructor(private readonly schoolHoursService: SchoolHoursService) {}

  @Post('create')
  async create(@Body() createSchoolHourDto: CreateSchoolHourDto) {
    return await this.schoolHoursService.create(createSchoolHourDto);
  }

  @Get()
  async findMany() {
    return await this.schoolHoursService.findMany();
  }
}
