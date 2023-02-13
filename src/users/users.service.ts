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
import { StudentsService } from 'src/students/students.service';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly studentsService: StudentsService,
    private readonly employeesService: EmployeesService,
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

    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: password,
          username: username,
          firstPassword,
        },
      });

      if (createUserDto.role === 'student') {
        await this.studentsService.create({ userId: newUser.id });
      }

      if (createUserDto.role === 'employee') {
        await this.employeesService.create({ userId: newUser.id });
      }

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
      throw new BadRequestException(
        'To change your password, you must first provide your current password',
      );
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
        throw new UnauthorizedException(
          "Current password doesn't match the stored password",
        );

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
      throw new BadRequestException('This username already exists.');
    }
  }

  async findUnique(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        Student: {
          include: {
            class: true,
          },
        },
      },
    });

    if (!user) throw new BadRequestException();

    delete user.firstPassword;
    delete user.password;

    return user;
  }

  async findMany(adminId: string) {
    return await this.prisma.user.findMany({
      where: {
        id: { not: adminId },
      },
      orderBy: [{ name: 'asc' }, { surname: 'asc' }],
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        username: true,
        dateOfBirth: true,
        role: true,
        gsm: true,
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
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        Employee: {
          include: {
            ClassTeacher: true,
            SubstituteClassTeacher: true,
          },
        },
      },
    });

    if (user.Employee) {
      if (user.Employee.ClassTeacher !== null) {
        throw new BadRequestException(
          'Before deleting an employee you must first replace him as a class teacher',
        );
      }

      if (user.Employee.SubstituteClassTeacher !== null) {
        throw new BadRequestException(
          'Before deleting an employee you must first replace him as a substitute class teacher',
        );
      }
    }

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
