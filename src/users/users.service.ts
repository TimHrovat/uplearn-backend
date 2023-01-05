import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

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

      return newUser;
    } catch (e) {
      this.handleError(e);
    }
  }

  async findMany() {
    return await this.prisma.user.findMany();
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({ where: { username: username } });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  private async newUsername(name: string, surname: string) {
    const userCount = await this.prisma.user.aggregate({
      where: { name, surname },
      _count: true,
    });

    this.logger.verbose(userCount);

    const username = (
      name +
      '.' +
      surname +
      (userCount._count + 1)
    ).toLowerCase();

    return username;
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }

  private handleError(e: Error) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new BadRequestException(e.code);
    }
  }
}
