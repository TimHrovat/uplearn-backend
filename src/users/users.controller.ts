import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('get-all/:adminId')
  async findAll(@Param('adminId') adminId: string) {
    return await this.usersService.findMany(adminId);
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return await this.usersService.findUnique(id);
  }

  @Patch('update/:id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateById(id, updateUserDto);
  }

  @Patch('update-authenticated')
  async updateAuthenticated(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return await this.usersService.updateAuthenticated(updateUserDto, req);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
