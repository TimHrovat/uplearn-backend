import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    name,
    surname,
    dateOfBirth,
    email,
    password,
    role,
  }: CreateEmployeeDto) {
    const hashedPassword = await this.hashPassword(password);

    try {
      const newEmployee = await this.prisma.employee.create({
        data: {
          name,
          surname,
          dateOfBirth,
          email,
          password: hashedPassword,
          role,
        },
      });
      return newEmployee;
    } catch (e) {
      console.log(e); //! fix this
    }
  }

  findAll() {
    return this.prisma.employee.findMany();
  }

  findOne(id: string) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      let hashedPassword: string;
      if (updateEmployeeDto.password) {
        hashedPassword = await this.hashPassword(updateEmployeeDto.password);
      }

      const updatedEmployee = await this.prisma.employee.update({
        where: { id },
        data: {
          ...updateEmployeeDto,
          password: hashedPassword,
        },
      });

      return updatedEmployee;
    } catch (e) {
      console.log(e);
    }
  }

  async teachesSubject(employeeID: string, subjectID: string) {
    try {
      const newConnection = await this.prisma.teachesSubject.create({
        data: {
          employeeID,
          subjectID,
        },
      });

      return newConnection;
    } catch (e) {
      console.log(e);
    }
  }

  async allEmployeesWhoTeachSubject(abbreviation: string) {
    return await this.prisma.employee.findMany({
      where: {
        teaches: {
          some: {
            subject: { abbreviation: abbreviation },
          },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.employee.delete({ where: { id } });
  }

  async hashPassword(password) {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }
}
