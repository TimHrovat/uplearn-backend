import { Module } from '@nestjs/common';
import { EmployeesSubjectsService } from './employees_subjects.service';
import { EmployeesSubjectsController } from './employees_subjects.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EmployeesSubjectsController],
  providers: [EmployeesSubjectsService],
  imports: [PrismaModule],
})
export class EmployeesSubjectsModule {}
