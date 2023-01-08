import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, StudentsModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
