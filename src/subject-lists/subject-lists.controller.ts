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
import { CreateSubjectListDto } from './dto/create-subject-list.dto';
import { SubjectListsService } from './subject-lists.service';

@Controller('subject-lists')
@ApiTags('Subject Lists')
@UseGuards(JwtAuthGuard)
export class SubjectListsController {
  constructor(private readonly subjectListsService: SubjectListsService) {}

  @Post('create')
  async create(@Body() createSubjectListDto: CreateSubjectListDto) {
    return await this.subjectListsService.create(createSubjectListDto);
  }

  @Get()
  async findAll() {
    return await this.subjectListsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.subjectListsService.delete(id);
  }
}
