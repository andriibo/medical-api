import {MailerService} from '@nestjs-modules/mailer';
import {IMailService} from 'app/modules/mail/services/mail.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class MailService implements IMailService {
    public constructor(private mailerService: MailerService) {}

    public async sendInviteToSignUp(email: string): Promise<void> {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Invite to Sign Up.',
            text: `You are invited to the Zenzerapp. Please, follow the link: zenzerapp://auth?email=${email}.`,
        });
    }
}
