import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';
import {User} from 'domain/entities';
import {IMailService} from 'app/modules/mail/services/abstract/mail.service';
import {Email} from 'app/modules/mail/models';

export class MailService implements IMailService {
    public constructor(private mailerService: IMailSenderService) {}

    public async sendInviteToSignUpFromPatientToDoctor(patient: User, toEmail: string): Promise<void> {
        const deepLink = `zenzerapp://auth?email=${toEmail}`;

        const mail: Email = {
            to: toEmail,
            subject: 'Invitation to Medical app.',
            text: `${patient.firstName} ${patient.lastName} wants to add you as their medical doctor on Medical app. SIGN UP ${deepLink}.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendInviteToSignUpFromDoctorToPatient(doctor: User, toEmail: string): Promise<void> {
        const deepLink = `zenzerapp://auth?email=${toEmail}`;

        const mail: Email = {
            to: toEmail,
            subject: 'Invitation to Medical app.',
            text: `${doctor.firstName} ${doctor.lastName} wants to add you as their medical patient on Medical app. SIGN UP ${deepLink}.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendNotificationThatPatientDataAccessWasInitiatedByPatient(
        patient: User,
        toEmail: string,
    ): Promise<void> {
        const deepLink = `zenzerapp://waiting-room`;

        const mail: Email = {
            to: toEmail,
            subject: 'New incoming request.',
            text: `${patient.firstName} ${patient.lastName} wants to add you as their medical doctor. VIEW REQUEST ${deepLink}.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendNotificationThatPatientDataAccessWasInitiatedByDoctor(
        doctor: User,
        toEmail: string,
    ): Promise<void> {
        const deepLink = `zenzerapp://waiting-room`;

        const mail: Email = {
            to: toEmail,
            subject: 'New incoming request.',
            text: `${doctor.firstName} ${doctor.lastName} wants to add you as their medical patient. VIEW REQUEST ${deepLink}.`,
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

    public async sendNotificationThatPatientDeletedDataAccess(patient: User, toEmail: string): Promise<void> {
        const mail: Email = {
            to: toEmail,
            subject: 'You were removed from list of doctors',
            text: `${patient.firstName} ${patient.lastName} has removed you from the list of their doctors. You no longer have access to the patient account.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendNotificationThatDoctorDeletedDataAccess(doctor: User, toEmail: string): Promise<void> {
        const mail: Email = {
            to: toEmail,
            subject: 'You were removed from list of patients',
            text: `${doctor.firstName} ${doctor.lastName} has removed you from the list of their patients and doesn't have access to your account anymore.`,
        };

        await this.mailerService.sendMail(mail);
    }
}
