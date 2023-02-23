import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { EmployeesModule } from './employees/employees.module';
import { SubjectsModule } from './subjects/subjects.module';
import { EmailModule } from './email/email.module';
import { SubjectListsModule } from './subject-lists/subject-lists.module';
import { ClassesModule } from './classes/classes.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { SchoolHoursModule } from './school-hours/school-hours.module';
import { LessonsModule } from './lessons/lessons.module';
import { SchoolYearsModule } from './school-years/school-years.module';
import { GradesModule } from './grades/grades.module';
import { AbsencesModule } from './absences/absences.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    StudentsModule,
    EmployeesModule,
    SubjectsModule,
    EmailModule,
    SubjectListsModule,
    ClassesModule,
    ClassroomsModule,
    SchoolHoursModule,
    LessonsModule,
    SchoolYearsModule,
    GradesModule,
    AbsencesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
