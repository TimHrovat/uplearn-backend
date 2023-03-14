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
import { ClassesService } from './classes.service';
import { ConnectToEmployeeSubjectDto } from './dto/connect-to-employee-subject.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
@ApiTags('Classes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Roles(Role.admin)
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

  @Get('/by-employee/:employeeId')
  async getByEmployee(@Param('employeeId') employeeId: string) {
    return await this.classesService.getByEmployee(employeeId);
  }

  @Get('/by-class-teacher/:employeeId')
  async getByClassTeacher(@Param('employeeId') employeeId: string) {
    return await this.classesService.getByClassTeacher(employeeId);
  }

  @Roles(Role.admin)
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

  @Roles(Role.admin)
  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return await this.classesService.update(name, updateClassDto);
  }

  @Roles(Role.admin)
  @Delete(':name')
  async delete(@Param('name') name: string) {
    return await this.classesService.delete(name);
  }
}
