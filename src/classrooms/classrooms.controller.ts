import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';

@Controller('classrooms')
@ApiTags('Classrooms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Roles(Role.admin)
  @Post('create')
  async create(@Body() createClassroomDto: CreateClassroomDto) {
    return await this.classroomsService.create(createClassroomDto);
  }

  @Get()
  async findMany() {
    return await this.classroomsService.findMany();
  }

  @Get('where-not-in-lesson/:date/:schoolHourId')
  async findManyWhereNotInLesson(
    @Param('date') date: string,
    @Param('schoolHourId') schoolHourId: string,
  ) {
    return await this.classroomsService.findManyWhereNotInLesson(
      date,
      schoolHourId,
    );
  }

  @Roles(Role.admin)
  @Delete(':name')
  async delete(@Param('name') name: string) {
    return await this.classroomsService.delete(name);
  }
}
