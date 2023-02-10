import {MailerService} from '@nestjs-modules/mailer';
import {IMailSender} from 'app/modules/mail/services/abstract/mail-sender';
import {Injectable} from '@nestjs/common';
import {Email} from 'app/modules/mail/models';

@Injectable()
export class MailhogService implements IMailSender {
    public constructor(private mailerService: MailerService) {}

    public async sendMail(message: Email): Promise<void> {
        await this.mailerService.sendMail(message);
    }
}
