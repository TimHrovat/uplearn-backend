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
import { ClassesService } from './classes.service';
import { ConnectToEmployeeSubjectDto } from './dto/connect-to-employee-subject.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
@ApiTags('Classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('create')
  async create(@Body() createClassDto: CreateClassDto) {
    return await this.classesService.create(createClassDto);
  }

  @Get()
  async findMany() {
    return await this.classesService.findMany();
  }

  @Get(':name')
  async findUnique(@Param('name') name: string) {
    return await this.classesService.findUnique(name);
  }

  @Post('connect-to-employee-subject/:name')
  async connectToEmployeeSubject(
    @Param('name') name: string,
    @Body() connectToEmployeeSubjectDto: ConnectToEmployeeSubjectDto,
  ) {
    return await this.classesService.connectToEmployeeSubject(
      name,
      connectToEmployeeSubjectDto,
    );
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return await this.classesService.update(name, updateClassDto);
  }

  @Delete(':name')
  async delete(@Param('name') name: string) {
    return await this.classesService.delete(name);
  }
}
