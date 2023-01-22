import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma, Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { generate } from 'generate-password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger: Logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto) {
    const firstPassword = generate({
      length: 16,
      numbers: true,
      symbols: true,
    });

    const password = await this.hashPassword(firstPassword);
    const username = await this.newUsername(
      createUserDto.name,
      createUserDto.surname,
    );

    createUserDto.dateOfBirth = createUserDto.dateOfBirth + 'T00:00:00.000Z';

    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: password,
          username: username,
          firstPassword,
        },
      });

      return newUser;
    } catch (e) {
      this.handleError(e);
    }
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password)
      updateUserDto.password = await this.hashPassword(updateUserDto.password);

    if (updateUserDto.dateOfBirth)
      updateUserDto.dateOfBirth = updateUserDto.dateOfBirth + 'T00:00:00.000Z';

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!user) throw new BadRequestException();

    delete user.password;
    delete user.firstPassword;

    return user;
  }

  async updateAuthenticated(updateUserDto: UpdateUserDto, req: Request) {
    let reqToken = null;

    if (req.cookies && 'token' in req.cookies) {
      reqToken = req.cookies.token;
    } else {
      return;
    }

    const decoded = this.jwtService.decode(reqToken);

    if (updateUserDto.password && !updateUserDto.currentPassword) {
      throw new BadRequestException({
        cause:
          'To change your password, you must first provide your current password',
      });
    }

    const user = await this.prisma.user.findUnique({
      where: { id: decoded['id'] },
    });

    if (updateUserDto.password) {
      const validPass = await bcrypt.compare(
        updateUserDto.currentPassword,
        user.password,
      );

      if (!validPass)
        throw new UnauthorizedException({
          cause: "Current password doesn't match the stored password",
        });

      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    delete updateUserDto.currentPassword;

    if (updateUserDto.dateOfBirth)
      updateUserDto.dateOfBirth = updateUserDto.dateOfBirth + 'T00:00:00.000Z';

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: decoded['id'] },
        data: updateUserDto,
      });

      return updatedUser;
    } catch (e) {
      throw new BadRequestException({ cause: 'This username already exists.' });
    }
  }

  async findUnique(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new BadRequestException();

    delete user.firstPassword;
    delete user.password;

    return user;
  }

  async findMany() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        username: true,
        dateOfBirth: true,
        role: true,
      },
    });
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  private async newUsername(name: string, surname: string) {
    const userCount = await this.prisma.user.aggregate({
      where: { name, surname },
      _count: true,
    });

    const username = (
      name +
      '.' +
      surname +
      (userCount._count + 1)
    ).toLowerCase();

    return username;
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }

  private validateRequest(id: string, req: Request) {
    const reqUser = req.user as { id: string; role: Role };

    if (id !== reqUser.id) throw new ForbiddenException();
  }

  private handleError(e: Error) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new BadRequestException(e.code);
    }
  }
}
