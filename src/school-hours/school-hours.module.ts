import { Module } from '@nestjs/common';
import { SchoolHoursService } from './school-hours.service';
import { SchoolHoursController } from './school-hours.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SchoolHoursController],
  providers: [SchoolHoursService],
  imports: [PrismaModule],
})
export class SchoolHoursModule {}
