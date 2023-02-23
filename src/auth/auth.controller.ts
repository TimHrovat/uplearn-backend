import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ReplaceFirstPasswordDto } from './dto/replace-first-password.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Req() req, @Res() res) {
    return await this.authService.login(loginUserDto, req, res);
  }

  @Post('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() replaceFirstPasswordDto: ReplaceFirstPasswordDto,
  ) {
    return await this.authService.resetPassword(token, replaceFirstPasswordDto);
  }

  @Get('logout')
  async logout(@Req() req, @Res() res) {
    return await this.authService.logout(req, res);
  }

  @Get('resend-credentials/:id')
  async resendCredentials(@Param('id') id: string) {
    return await this.authService.resendCredentials(id);
  }

  @Get('send-reset-password-email/:username')
  async sendForgotPasswordEmail(@Param('username') username: string) {
    return await this.authService.sendForgotPasswordEmail(username);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  @Patch('replace-first-password')
  async replaceFirstPassword(
    @Body() replaceFirstPasswordDto: ReplaceFirstPasswordDto,
    @Req() req,
    @Res() res,
  ) {
    return await this.authService.replaceFirstPassword(
      replaceFirstPasswordDto,
      req,
      res,
    );
  }
}
