import {MailerService} from '@nestjs-modules/mailer';
import {Injectable} from '@nestjs/common';
import {IMailService} from 'app/services/mail.service';
import {User} from 'domain/entities';

@Injectable()
export class MailService implements IMailService {
    constructor(private mailerService: MailerService) {}

    async sendInviteToSignUp(email: string): Promise<void> {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Invite to Sign Up.',
            text: `This is the URL to Sign Up Form.`,
        });
    }
}
