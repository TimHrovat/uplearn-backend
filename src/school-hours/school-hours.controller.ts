import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateSchoolHourDto } from './dto/create-school-hour.dto';
import { UpdateSchoolHourDto } from './dto/update-school-hour.dto';
import { SchoolHoursService } from './school-hours.service';

@Controller('school-hours')
@ApiTags('School Hours')
@UseGuards(JwtAuthGuard)
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.schoolHoursService.delete(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSchoolHourDto: UpdateSchoolHourDto,
  ) {
    return await this.schoolHoursService.update(id, updateSchoolHourDto);
  }
}
