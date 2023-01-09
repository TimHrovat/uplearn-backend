import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
@ApiTags('Subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post('create')
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return await this.subjectsService.create(createSubjectDto);
  }

  @Get()
  async findAll() {
    return await this.subjectsService.findAll();
  }

  @Get(':abbreviation')
  async findUnique(@Param('abbreviation') abbreviation: string) {
    return await this.subjectsService.findUnique(abbreviation);
  }

  @Patch(':abbreviation')
  async update(
    @Param('abbreviation') abbreviation: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return await this.subjectsService.update(abbreviation, updateSubjectDto);
  }

  @Delete(':abbreviation')
  async delete(@Param('abbreviation') abbreviation: string) {
    return await this.subjectsService.delete(abbreviation);
  }
}
