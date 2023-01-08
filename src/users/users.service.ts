import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma, Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger: Logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto) {
    const password = await this.hashPassword(createUserDto.firstPassword);
    const username = await this.newUsername(
      createUserDto.name,
      createUserDto.surname,
    );

    try {
      const newUser = await this.prisma.user.create({
        data: { ...createUserDto, password: password, username: username },
      });

      delete newUser.password;
      delete newUser.firstPassword;

      return newUser;
    } catch (e) {
      this.handleError(e);
    }
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password != null) {
      await this.prisma.user.update({
        where: { id },
        data: { firstPassword: null },
      });
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!user) throw new BadRequestException();

    delete user.password;
    delete user.firstPassword;

    return user;
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
