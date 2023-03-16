import { ExcelService } from './excel.service';
import {
  Controller,
  Get,
  Header,
  Post,
  Res,
  StreamableFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('excel')
@ApiTags('Excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('add-users-excel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.admin)
  @UseInterceptors(
    FileInterceptor('import', {
      storage: diskStorage({
        destination: './uploads/xlsx',
        filename: (req, file, callback) => {
          callback(null, `import.xlsx`);
        },
      }),
    }),
  )
  async addUsersExcel(@Res() res: Response) {
    return this.excelService.addUsersExcel(res);
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
