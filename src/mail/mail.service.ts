import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmation(email: string, code: number) {
    const fromEmail = this.configService.get('MAIL_FROM').replace(/[<>]/g, '');
    await this.mailerService.sendMail({
      to: email,
      from: `<${fromEmail}>`,
      subject: 'Welcome to our app! Confirm your Email',
      template: './verify',
      context: {
        code,
      },
    });
  }

  async sendResetPassword(email: string, code: number) {
    const fromEmail = this.configService.get('MAIL_FROM').replace(/[<>]/g, '');
    await this.mailerService.sendMail({
      to: email,
      from: `<${fromEmail}>`,
      subject: 'Password Reset',
      template: './reset',
      context: {
        code,
      },
    });
  }

  // Add other email sending methods as needed
}
