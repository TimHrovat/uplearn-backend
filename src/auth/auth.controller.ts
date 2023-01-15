import { Body, Controller, Get, Patch, Post, Req, Res } from '@nestjs/common';
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

  @Get('logout')
  async logout(@Req() req, @Res() res) {
    return await this.authService.logout(req, res);
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
