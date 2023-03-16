import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ExcelController],
  providers: [ExcelService],
  imports: [PrismaModule, AuthModule],
})
export class ExcelModule {}
