import { Module } from '@nestjs/common';
import { AbsencesService } from './absences.service';
import { AbsencesController } from './absences.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SchoolYearsModule } from 'src/school-years/school-years.module';

@Module({
  controllers: [AbsencesController],
  providers: [AbsencesService],
  imports: [PrismaModule, SchoolYearsModule],
})
export class AbsencesModule {}
