import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { emailPassword, emailService, emailUser } from 'src/utils/constants';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: emailService,
        port: 587,
        secure: false,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      },
      defaults: {
        from: '"No Reply" <phosphor@bogi.si>',
      },
      template: {
        dir: join(__dirname, '../../email/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
