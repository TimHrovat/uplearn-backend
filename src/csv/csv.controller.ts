import {
  Controller,
  Get,
  Header,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { CsvService } from './csv.service';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('add-users-csv')
  @UseInterceptors(
    FileInterceptor('import', {
      storage: diskStorage({
        destination: './uploads/csv',
        filename: (req, file, callback) => {
          callback(null, `import.csv`);
        },
      }),
    }),
  )
  async addUsersCsv(@UploadedFile() file: Express.Multer.File) {
    return this.csvService.addUsersCsv();
  }

  @Get('template')
  @Header('Content-Type', 'application/xlsx')
  @Header(
    'Content-Disposition',
    'attachment; filename="import_user_template.xlsx"',
  )
  async downloadTemplate() {
    const file = createReadStream(
      join(process.cwd(), './src/assets/import_user_template.xlsx'),
    );
    return new StreamableFile(file);
  }
}
