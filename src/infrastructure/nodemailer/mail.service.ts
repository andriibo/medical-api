import {MailerService} from '@nestjs-modules/mailer';
import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';
import {Injectable} from '@nestjs/common';
import {Email} from 'app/modules/mail/models';

@Injectable()
export class MailhogService implements IMailSenderService {
    public constructor(private mailerService: MailerService) {}

    public async sendMail(message: Email): Promise<void> {
        await this.mailerService.sendMail(message);
    }
}
