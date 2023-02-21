import { Module } from '@nestjs/common';
import { SchoolYearsService } from './school-years.service';
import { SchoolYearsController } from './school-years.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SchoolYearsController],
  providers: [SchoolYearsService],
  imports: [PrismaModule],
  exports: [SchoolYearsService],
})
export class SchoolYearsModule {}
