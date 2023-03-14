import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
  imports: [PrismaModule, UsersModule],
})
export class ClassesModule {}
