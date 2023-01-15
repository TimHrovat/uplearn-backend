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
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { ReplaceFirstPasswordDto } from './dto/replace-first-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
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

    const { firstPassword, password, ...otherData } = user;

    return otherData;
  }

  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    this.logger.verbose('user created');

    if (!user) {
      throw new BadRequestException();
    }

    await this.emailService.sendCredentials(user.email, {
      name: user.name,
      username: user.username,
      password: user.firstPassword,
    });

    return user;
  }

  async replaceFirstPassword(
    replaceFirstPasswordDto: ReplaceFirstPasswordDto,
    req: Request,
    res: Response,
  ) {
    let reqToken = null;

    if (req.cookies && 'token' in req.cookies) {
      reqToken = req.cookies.token;
    } else {
      return;
    }

    const decoded = this.jwtService.decode(reqToken);

    const hashedPassword = await this.usersService.hashPassword(
      replaceFirstPasswordDto.password,
    );

    const user = await this.usersService.updateById(decoded['id'], {
      firstPassword: null,
      firstPasswordReplaced: true,
      password: hashedPassword,
    });

    const payload = {
      id: user.id,
      firstPasswordReplaced: user.firstPasswordReplaced,
      role: user.role,
    };

    const token = this.jwtService.sign(payload, { secret: jwtSecret });

    if (!token) {
      throw new ForbiddenException('No token');
    }

    res.cookie('token', token, { sameSite: 'none', secure: true });

    return res.send({ message: 'First password replaced successfully' });
  }

  async login(loginUserDto: LoginUserDto, req: Request, res: Response) {
    const user = await this.validateUser(loginUserDto);

    const payload = {
      id: user.id,
      firstPasswordReplaced: user.firstPasswordReplaced,
      role: user.role,
    };

    const token = this.jwtService.sign(payload, { secret: jwtSecret });

    if (!token) {
      throw new ForbiddenException('No token');
    }

    res.cookie('token', token, { sameSite: 'none', secure: true });

    return res.send({ message: 'Logged in succesfully' });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');

    return res.send({ message: 'Logged out succesfully' });
  }
}
