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
import { AbsencesService } from './absences.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';

@Controller('absences')
@ApiTags('Absences')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AbsencesController {
  constructor(private readonly absencesService: AbsencesService) {}

  @Roles(Role.employee, Role.admin)
  @Post('create')
  async create(@Body() createAbsenceDto: CreateAbsenceDto) {
    return await this.absencesService.create(createAbsenceDto);
  }

  @Get(':studentId')
  async getByStudent(@Param('studentId') studentId: string) {
    return await this.absencesService.getByStudent(studentId);
  }

  @Roles(Role.employee, Role.admin)
  @Patch('set-excused/:id')
  async setExcused(@Param('id') id: string) {
    return await this.absencesService.setExcused(id);
  }

  @Roles(Role.employee, Role.admin)
  @Patch('set-unexcused/:id')
  async setUnexcused(@Param('id') id: string) {
    return await this.absencesService.setUnexcused(id);
  }

  @Roles(Role.employee, Role.admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.absencesService.delete(id);
  }
}
