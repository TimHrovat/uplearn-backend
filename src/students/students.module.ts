import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SchoolYearsModule } from 'src/school-years/school-years.module';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [PrismaModule, SchoolYearsModule, PrismaModule],
  exports: [StudentsService],
})
export class StudentsModule {}
