import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [PrismaModule, UsersModule],
})
export class LessonsModule {}
