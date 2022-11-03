import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';
import {Inject, Injectable} from '@nestjs/common';
import {User} from 'domain/entities';
import {IMailService} from './abstract/mail.service';
import {Email} from 'app/modules/mail/models';

@Injectable()
export class MailService implements IMailService {
    public constructor(@Inject(IMailSenderService) private mailerService: IMailSenderService) {}

    public async sendInviteToSignUp(patient: User, toEmail: string): Promise<void> {
        const deepLink = `zenzerapp://auth?email=${toEmail}`;

        const mail: Email = {
            to: toEmail,
            subject: 'Invitation to Medical app.',
            text: `${patient.firstName} ${patient.lastName} wants to add you as their medical doctor on Medical app. SIGN UP ${deepLink}.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendNotificationThatPatientDataAccessWasInitiated(patient: User, toEmail: string): Promise<void> {
        const deepLink = `zenzerapp://waiting-room`;

        const mail: Email = {
            to: toEmail,
            subject: 'New incoming request.',
            text: `${patient.firstName} ${patient.lastName} wants to add you as their medical doctor. VIEW REQUEST ${deepLink}.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendNotificationThatUserWasActivated(toEmail: string): Promise<void> {
        const mail: Email = {
            to: toEmail,
            subject: 'Welcome to Medical app!',
            text: 'We are so excited to have you on board.',
        };

        await this.mailerService.sendMail(mail);
    }
}
