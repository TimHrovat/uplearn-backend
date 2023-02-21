import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { SchoolYearsService } from './school-years.service';

@Controller('school-years')
@ApiTags('School Years')
@UseGuards(JwtAuthGuard)
export class SchoolYearsController {
  constructor(private readonly schoolYearsService: SchoolYearsService) {}

  // @Get('create-current')
  // async createCurrent() {
  //   return await this.schoolYearsService.createCurrent();
  // }

  @Get('get-active')
  async getActive() {
    return await this.schoolYearsService.getActive();
  }
}
