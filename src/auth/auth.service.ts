import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SetUserPasswordDto } from './dto/set-user-password.dto';
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger: Logger = new Logger(AuthService.name);

  async validateUserPassword(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByUsername(loginUserDto.username);

    if (!user) {
      this.logger.verbose(
        `${loginUserDto.username} provided a username that doesn't exist`,
      );

      throw new UnauthorizedException({ cause: loginUserDto.username });
    }

    const validPass = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!validPass) {
      this.logger.verbose(
        `${loginUserDto.username} provided an incorrect password`,
      );

      throw new UnauthorizedException({ cause: loginUserDto.password });
    }

    return user;
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.validateUserPassword(loginUserDto);

    if (user.firstPassword) {
      throw new ForbiddenException('Password not yet changed');
    }

    const { firstPassword, password, ...otherData } = user;

    return otherData;
  }

  async setNewUserPassword(setUserPasswordDto: SetUserPasswordDto) {
    const { username, password, newPassword } = setUserPasswordDto;

    const user = await this.validateUserPassword({ username, password });

    const invalidPassword = await bcrypt.compare(newPassword, user.password);

    if (invalidPassword) {
      this.logger.verbose(
        `${username} tried to change their password but provided the same password`,
      );

      throw new BadRequestException('New password is the same as the old one');
    }

    const newPasswordHashed = await this.usersService.hashPassword(newPassword);

    const updatedUser = await this.usersService.updateById(user.id, {
      password: newPasswordHashed,
    });

    if (!updatedUser) {
      throw new BadRequestException();
    }

    return updatedUser;
  }

  async login(loginUserDto: LoginUserDto, req: Request, res: Response) {
    const user = await this.validateUser(loginUserDto);

    const payload = {
      id: user.id,
      role: user.role,
    };

    const token = this.jwtService.sign(payload, { secret: jwtSecret });

    if (!token) {
      throw new ForbiddenException('No token');
    }

    res.cookie('token', token);

    return res.send({ message: 'Logged in succesfully' });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');

    return res.send({ message: 'Logged out succesfully' });
  }
}
