import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SetUserPasswordDto } from './dto/set-user-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Req() req, @Res() res) {
    return await this.authService.login(loginUserDto, req, res);
  }

  @Get('logout')
  async logout(@Req() req, @Res() res) {
    return await this.authService.logout(req, res);
  }

  @Post('set_new_user_password')
  async setNewUserPassword(@Body() setUserPasswordDto: SetUserPasswordDto) {
    return await this.authService.setNewUserPassword(setUserPasswordDto);
  }
}
