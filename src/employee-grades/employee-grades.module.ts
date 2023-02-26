import { Module } from '@nestjs/common';
import { EmployeeGradesService } from './employee-grades.service';
import { EmployeeGradesController } from './employee-grades.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EmployeeGradesController],
  providers: [EmployeeGradesService],
  imports: [PrismaModule],
})
export class EmployeeGradesModule {}
