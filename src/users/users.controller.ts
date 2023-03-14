import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.admin)
  @Get('get-all/:adminId')
  async findAll(@Param('adminId') adminId: string) {
    return await this.usersService.findMany(adminId);
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return await this.usersService.findUnique(id);
  }

  @Roles(Role.admin)
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

  @Roles(Role.admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
