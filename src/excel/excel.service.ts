import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Workbook } from 'exceljs';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';

@Injectable()
export class ExcelService {
  constructor(private readonly authService: AuthService) {}

  async addUsersExcel(res: Response) {
    const workBook = new Workbook();
    await workBook.xlsx.readFile('uploads/xlsx/import.xlsx');

    const sheet = workBook.getWorksheet('Sheet1');

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      // console.log(values[0]);
      row.eachCell({ includeEmpty: true }, function (cell, cellNumber) {
        if (cellNumber === 4) return;

        if (cell.text === '') {
          throw new BadRequestException('Failed to register users');
        }
      });

      const userData: CreateUserDto = {
        name: row.getCell(1).text,
        surname: row.getCell(2).text,
        email: row.getCell(3).text,
        gsm: row.getCell(4).text,
        dateOfBirth: row.getCell(5).text,
        role: Role[row.getCell(6).text],
      };

      // console.log(userData);

      this.authService.registerUser(userData);
    });

    return res.send({ message: 'Users added successfully' });

    // const csvFile = readFileSync('uploads/csv/import.csv');
    // const csvString = csvFile.toString();

    // try {
    //   parse(csvString, {
    //     header: false,
    //     complete: (result: any) => {
    //       const data = result.data;
    //       data.shift();

    //       console.log(data);

    //       data.forEach((d: any) => {
    //         const userData: CreateUserDto = {
    //           name: d[0],
    //           surname: d[1],
    //           email: d[2],
    //           gsm: d[3],
    //           dateOfBirth: d[4],
    //           role: d[5],
    //         };

    //         this.authService.registerUser(userData);
    //       });
    //     },
    //   });
    // } catch {
    //   throw new BadRequestException('Failed to register users');
    // }
  }
}
