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
import { AbsencesService } from './absences.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';

@Controller('absences')
@ApiTags('Absences')
@UseGuards(JwtAuthGuard)
export class AbsencesController {
  constructor(private readonly absencesService: AbsencesService) {}

  @Post('create')
  async create(@Body() createAbsenceDto: CreateAbsenceDto) {
    return await this.absencesService.create(createAbsenceDto);
  }

  @Get(':studentId')
  async getByStudent(@Param('studentId') studentId: string) {
    return await this.absencesService.getByStudent(studentId);
  }

  @Patch('set-excused/:id')
  async setExcused(@Param('id') id: string) {
    return await this.absencesService.setExcused(id);
  }

  @Patch('set-unexcused/:id')
  async setUnexcused(@Param('id') id: string) {
    return await this.absencesService.setUnexcused(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.absencesService.delete(id);
  }
}
