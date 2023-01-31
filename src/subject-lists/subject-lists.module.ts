import { Module } from '@nestjs/common';
import { SubjectListsService } from './subject-lists.service';
import { SubjectListsController } from './subject-lists.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SubjectListsController],
  providers: [SubjectListsService],
  imports: [PrismaModule],
})
export class SubjectListsModule {}
