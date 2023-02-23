import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import {
  emailPassword,
  emailService,
  emailUser,
  frontendUrl,
} from 'src/utils/constants';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  private readonly logger: Logger = new Logger(EmailService.name);

  async sendResetPassword(email: string, token: string) {
    const url = frontendUrl + `/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'UpLearn - Reset your password',
      template: './reset_password',
      context: {
        url,
      },
    });
  }

  async sendCredentials(email: string, { name, username, password }) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to UpLearn!',
      template: './credentials',
      context: {
        name,
        username,
        password,
      },
    });
  }
}
