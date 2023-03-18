import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Workbook } from 'exceljs';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
import * as fs from 'fs';

@Injectable()
export class ExcelService {
  constructor(private readonly authService: AuthService) {}

  async addUsersExcel(res: Response) {
    const workBook = new Workbook();

    if (!workBook) throw new BadRequestException("Excel couldn't load");

    await workBook.xlsx.readFile('uploads/xlsx/import.xlsx');

    const sheet = workBook.getWorksheet('data');

    if (!sheet)
      throw new BadRequestException(
        "Don't change the sheet name in the excel file",
      );

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      row.eachCell({ includeEmpty: true }, function (cell, cellNumber) {
        if (cellNumber === 4) return;

        if (
          cellNumber === 6 &&
          !['admin', 'employee', 'student'].includes(cell.text)
        )
          throw new BadRequestException('Provide a valid role');

        if (cell.text === '') {
          throw new BadRequestException('Failed to register users');
        }
      });

      const userData: CreateUserDto = {
        name: row.getCell(1).text,
        surname: row.getCell(2).text,
        email: row.getCell(3).text,
        gsm: row.getCell(4).text,
        dateOfBirth: new Date(row.getCell(5).text).toISOString(),
        role: Role[row.getCell(6).text],
      };

      this.authService.registerUser(userData);
    });

    fs.unlink('uploads/xlsx/import.xlsx', (err) => {
      if (err) console.error(err);
    });

    return res.send({ message: 'Users added successfully' });
  }
}
