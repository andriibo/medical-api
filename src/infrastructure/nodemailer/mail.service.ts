import {MailerService} from '@nestjs-modules/mailer';
import {IMailService} from 'app/modules/mail/services/mail.service';
import {Injectable} from '@nestjs/common';
import {User} from 'domain/entities';

@Injectable()
export class MailService implements IMailService {
    public constructor(private mailerService: MailerService) {}

    public async sendInviteToSignUp(patient: User, toEmail: string): Promise<void> {
        const deepLink = `zenzerapp://auth?email=${toEmail}`;

        await this.mailerService.sendMail({
            to: toEmail,
            subject: 'Invitation to Medical app.',
            text: `${patient.firstName} ${patient.lastName} wants to add you as their medical doctor on Medical app. SIGN UP ${deepLink}.`,
        });
    }

    public async sendNotificationThatPatientDataAccessWasInitiated(patient: User, toEmail: string): Promise<void> {
        const deepLink = `zenzerapp://waiting-room`;

        await this.mailerService.sendMail({
            to: toEmail,
            subject: 'New incoming request.',
            text: `${patient.firstName} ${patient.lastName} wants to add you as their medical doctor. VIEW REQUEST ${deepLink}.`,
        });
    }
}
