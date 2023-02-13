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
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';

@Controller('classrooms')
@ApiTags('Classrooms')
@UseGuards(JwtAuthGuard)
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

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

  @Delete(':name')
  async delete(@Param('name') name: string) {
    return await this.classroomsService.delete(name);
  }
}
