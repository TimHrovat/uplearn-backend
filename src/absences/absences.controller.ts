import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AbsencesService } from './absences.service';

@Controller('absences')
@ApiTags('Absences')
@UseGuards(JwtAuthGuard)
export class AbsencesController {
  constructor(private readonly absencesService: AbsencesService) {}
}
