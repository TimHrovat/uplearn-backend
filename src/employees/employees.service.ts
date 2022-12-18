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

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: string) {
    return `This action removes a #${id} employee`;
  }

  async hashPassword(password) {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }
}
