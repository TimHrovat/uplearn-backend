import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { EmployeesModule } from './employees/employees.module';
import { SubjectsModule } from './subjects/subjects.module';
import { EmployeesSubjectsModule } from './employees_subjects/employees_subjects.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, StudentsModule, EmployeesModule, SubjectsModule, EmployeesSubjectsModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
