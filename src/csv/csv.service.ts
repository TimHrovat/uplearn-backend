import { BadRequestException, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class CsvService {
  constructor(private readonly authService: AuthService) {}

  async addUsersCsv() {
    const csvFile = readFileSync('uploads/csv/import.csv');
    const csvString = csvFile.toString();

    try {
      parse(csvString, {
        header: false,
        complete: (result: any) => {
          const data = result.data;
          data.shift();

          console.log(data);

          data.forEach((d: any) => {
            const userData: CreateUserDto = {
              name: d[0],
              surname: d[1],
              email: d[2],
              gsm: d[3],
              dateOfBirth: d[4],
              role: d[5],
            };

            this.authService.registerUser(userData);
          });
        },
      });
    } catch {
      throw new BadRequestException('Failed to register users');
    }
  }
}
