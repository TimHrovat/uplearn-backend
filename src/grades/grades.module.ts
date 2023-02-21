import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SchoolYearsModule } from 'src/school-years/school-years.module';

@Module({
  controllers: [GradesController],
  providers: [GradesService],
  imports: [PrismaModule, SchoolYearsModule],
})
export class GradesModule {}
