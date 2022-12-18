import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { EmployeesModule } from './employees/employees.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [PrismaModule, StudentsModule, ClassesModule, EmployeesModule, SubjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
