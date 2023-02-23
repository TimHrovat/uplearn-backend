import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AbsencesService {
  constructor(private readonly prisma: PrismaService) {}
}
