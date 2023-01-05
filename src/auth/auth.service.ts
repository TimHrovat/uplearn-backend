import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger: Logger = new Logger(AuthService.name);

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByUsername(loginUserDto.username);

    if (!user) {
      this.logger.verbose(
        `${loginUserDto.username} tried to login with username that doesn't exist`,
      );

      throw new UnauthorizedException({ cause: loginUserDto.username });
    }

    const validPass = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!validPass) {
      this.logger.verbose(
        `${loginUserDto.username} tried to login with incorrect password`,
      );

      throw new UnauthorizedException({ cause: loginUserDto.password });
    }

    if (user.firstPassword) {
      throw new ForbiddenException('Password not yet changed');
    }

    const { firstPassword, password, ...otherData } = user;

    return otherData;
  }

  //TODO: add method for first login

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);

    const payload = {
      id: user.id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
