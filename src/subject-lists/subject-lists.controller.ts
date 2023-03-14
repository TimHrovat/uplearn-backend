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
import { CreateSubjectListDto } from './dto/create-subject-list.dto';
import { SubjectListsService } from './subject-lists.service';

@Controller('subject-lists')
@ApiTags('Subject Lists')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubjectListsController {
  constructor(private readonly subjectListsService: SubjectListsService) {}

  @Roles(Role.admin)
  @Post('create')
  async create(@Body() createSubjectListDto: CreateSubjectListDto) {
    return await this.subjectListsService.create(createSubjectListDto);
  }

  @Get()
  async findAll() {
    return await this.subjectListsService.findAll();
  }

  @Roles(Role.admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.subjectListsService.delete(id);
  }
}
