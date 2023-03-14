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
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { CreateSchoolHourDto } from './dto/create-school-hour.dto';
import { UpdateSchoolHourDto } from './dto/update-school-hour.dto';
import { SchoolHoursService } from './school-hours.service';

@Controller('school-hours')
@ApiTags('School Hours')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SchoolHoursController {
  constructor(private readonly schoolHoursService: SchoolHoursService) {}

  @Roles(Role.admin)
  @Post('create')
  async create(@Body() createSchoolHourDto: CreateSchoolHourDto) {
    return await this.schoolHoursService.create(createSchoolHourDto);
  }

  @Get()
  async findMany() {
    return await this.schoolHoursService.findMany();
  }

  @Roles(Role.admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.schoolHoursService.delete(id);
  }

  @Roles(Role.admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSchoolHourDto: UpdateSchoolHourDto,
  ) {
    return await this.schoolHoursService.update(id, updateSchoolHourDto);
  }
}
