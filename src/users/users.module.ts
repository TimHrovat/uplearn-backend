import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { EmployeesModule } from 'src/employees/employees.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  imports: [
    PrismaModule,
    JwtModule,
    forwardRef(() => EmployeesModule),
    forwardRef(() => StudentsModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
