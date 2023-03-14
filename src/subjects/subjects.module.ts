import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService],
  imports: [PrismaModule, UsersModule],
})
export class SubjectsModule {}
