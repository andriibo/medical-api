import {MailerService} from '@nestjs-modules/mailer';
import {IMailService} from 'app/services/mail.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class MailService implements IMailService {
    public constructor(private mailerService: MailerService) {}

    public async sendInviteToSignUp(email: string): Promise<void> {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Invite to Sign Up.',
            text: `This is the URL to Sign Up Form for ${email}.`,
        });
    }
}
