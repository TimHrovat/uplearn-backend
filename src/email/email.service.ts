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

  // TODO: implement this the right way
  // async sendResetPassword(
  //   sendResetPasswordDto: SendResetPasswordDto,
  //   token: string,
  // ) {
  //   const url = frontendUrl + `/auth/resetPassword?token=${token}`;

  //   await this.mailerService.sendMail({
  //     to: sendResetPasswordDto.email,
  //     // from: '"Support Team" <support@example.com>', // override default from
  //     subject: 'Welcome to Nice App! Confirm your Email',
  //     template: './confirmation', // `.hbs` extension is appended automatically
  //     context: {
  //       // ✏️ filling curly brackets with content
  //       name: sendResetPasswordDto.user,
  //       url,
  //     },
  //   });
  // }

  async sendResetPassword(email: string, token: string) {
    const url = frontendUrl + `/auth/resetPassword?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Nice App! Confirm your Email',
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
