import {
  BadGatewayException,
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
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) {}

  private readonly logger: Logger = new Logger(AuthService.name);

  async validateUserPassword(loginUserDto: LoginUserDto) {
    const user = await this.usersService
      .findByUsername(loginUserDto.username)
      .catch(() => {
        throw new UnauthorizedException('Wrong username or password');
      });

    const validPass = await bcrypt
      .compare(loginUserDto.password, user.password)
      .catch(() => {
        throw new UnauthorizedException('Wrong username or password');
      });

    if (!validPass) {
      this.logger.verbose(
        `${loginUserDto.username} provided an incorrect password`,
      );

      throw new UnauthorizedException('Wrong username or password');
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

    if (!user) {
      throw new BadRequestException('User couldnt be created');
    }

    await this.emailService
      .sendCredentials(user.email, {
        name: user.name,
        username: user.username,
        password: user.firstPassword,
      })
      .catch(async () => {
        await this.usersService.delete(user.id);

        throw new BadRequestException(
          "Couldn't send message to provided email",
        );
      });

    this.logger.verbose('user created');

    return user;
  }

  async sendForgotPasswordEmail(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new BadRequestException('User with this username does not exist');
    }

    const payload = {
      id: user.id,
    };

    const token = this.jwtService.sign(payload, { secret: jwtSecret });

    const updatedUser = await this.prisma.user.update({
      where: { username },
      data: { resetPasswordToken: token },
    });

    if (!updatedUser) {
      throw new BadRequestException('Something went wrong please try again');
    }

    await this.emailService
      .sendResetPassword(user.email, token)
      .catch(async () => {
        throw new BadRequestException(
          "Couldn't send message to provided email",
        );
      });

    delete user.firstPassword;
    delete user.password;

    return user;
  }

  async resetPassword(
    token: string,
    replaceFirstPasswordDto: ReplaceFirstPasswordDto,
  ) {
    const decoded = this.jwtService.decode(token);

    const user = await this.prisma.user.findUnique({
      where: { id: decoded['id'] },
    });

    if (user.resetPasswordToken !== token)
      throw new BadGatewayException('Invalid password reset token');

    return await this.usersService.updateById(decoded['id'], {
      firstPassword: null,
      firstPasswordReplaced: true,
      password: replaceFirstPasswordDto.password,
    });
  }

  async resendCredentials(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user.firstPasswordReplaced)
      throw new BadRequestException('User has already replaced his password');

    await this.emailService
      .sendCredentials(user.email, {
        name: user.name,
        username: user.username,
        password: user.firstPassword,
      })
      .catch(async () => {
        throw new BadRequestException(
          "Couldn't send message to provided email",
        );
      });

    delete user.firstPassword;
    delete user.password;

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

    const user = await this.usersService.updateById(decoded['id'], {
      firstPassword: null,
      firstPasswordReplaced: true,
      password: replaceFirstPasswordDto.password,
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

    res.cookie('token', token, {
      sameSite: 'none',
      secure: true,
      httpOnly: false,
    });

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

    res.cookie('token', token, {
      sameSite: 'none',
      secure: true,
      httpOnly: false,
    });

    return res.send({ message: 'Logged in succesfully' });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');

    return res.send({ message: 'Logged out succesfully' });
  }
}
