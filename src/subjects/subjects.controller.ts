import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { CreateSubjectManyDto } from './dto/create-subject-many.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
@ApiTags('Subjects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Roles(Role.admin)
  @Post('create')
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return await this.subjectsService.create(createSubjectDto);
  }

  @Roles(Role.admin)
  @Post('create-many')
  async createMany(@Body() createSubjectManyDto: CreateSubjectManyDto) {
    return await this.subjectsService.createFromArrayOfObjects(
      createSubjectManyDto,
    );
  }

  @Get()
  async findAll() {
    return await this.subjectsService.findAll();
  }

  @Get(':abbreviation')
  async findUnique(@Param('abbreviation') abbreviation: string) {
    return await this.subjectsService.findUnique(abbreviation);
  }

  @Roles(Role.admin)
  @Patch(':abbreviation')
  async update(
    @Param('abbreviation') abbreviation: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return await this.subjectsService.update(abbreviation, updateSubjectDto);
  }

  @Roles(Role.admin)
  @Delete(':abbreviation')
  async delete(@Param('abbreviation') abbreviation: string) {
    return await this.subjectsService.delete(abbreviation);
  }
}
