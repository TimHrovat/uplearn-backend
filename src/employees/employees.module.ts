import { forwardRef, Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [PrismaModule, forwardRef(() => UsersModule)],
  exports: [EmployeesService],
})
export class EmployeesModule {}
