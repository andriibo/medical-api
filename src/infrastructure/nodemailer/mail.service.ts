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

    public async sendNotificationThatUserWasActivated(toEmail: string): Promise<void> {
        await this.mailerService.sendMail({
            to: toEmail,
            subject: 'Welcome to Medical app!',
            text: 'We are so excited to have you on board.',
        });
    }

    public async sendNotificationThatPatientDataAccessWasDeleted(toEmail: string): Promise<void> {
        await this.mailerService.sendMail({
            to: toEmail,
            subject: 'You were removed from list of doctors',
            text: '<Patient full name> has removed you from the list of their doctors. You no longer have access to the patient account.',
        });
    }
}
