import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CsvController],
  providers: [CsvService],
  imports: [PrismaModule, AuthModule],
})
export class CsvModule {}
