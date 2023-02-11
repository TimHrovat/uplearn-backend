import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateManyLessonsDto } from './dto/create-many-lessons.dto';
import { LessonsService } from './lessons.service';

@Controller('lessons')
@ApiTags('Lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('create')
  async create(@Body() createLessonDto: CreateLessonDto) {
    return await this.lessonsService.create(createLessonDto);
  }

  @Post('create-many')
  async createMany(@Body() createManyLessonsDto: CreateManyLessonsDto) {
    return await this.lessonsService.createLessonsForWholeSchoolYear(
      createManyLessonsDto,
    );
  }

  @Get('lessons-by-class-and-date-range/:name/:start/:end')
  async getLessonsByClassAndDateRange(
    @Param('name') className: string,
    @Param('start') startDate: string,
    @Param('end') endDate: string,
  ) {
    return await this.lessonsService.getLessonsByClassAndDateRange(
      className,
      startDate,
      endDate,
    );
  }

  @Get()
  async findMany() {
    return await this.lessonsService.findMany();
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return await this.lessonsService.findUnique(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.lessonsService.delete(id);
  }

  @Delete('delete-many/:lessonGroupId')
  async deleteMany(@Param('lessonGroupId') lessonGroupId: string) {
    return await this.lessonsService.deleteMany(lessonGroupId);
  }
}
