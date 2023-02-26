import {
  Body,
  Controller,
  Delete,
  Param,
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.absencesService.delete(id);
  }
}
