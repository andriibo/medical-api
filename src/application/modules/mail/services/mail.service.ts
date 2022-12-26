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

    public async sendInviteToSignUpFromPatientToCaregiver(patient: User, toEmail: string): Promise<void> {
        const deepLink = `zenzerapp://auth?email=${toEmail}`;

        const mail: Email = {
            to: toEmail,
            subject: 'Invitation to Medical app.',
            text: `${patient.firstName} ${patient.lastName} wants to add you as their caregiver on Medical app. SIGN UP ${deepLink}.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendInviteToSignUpFromGrantedUserToPatient(grantedUser: User, toEmail: string): Promise<void> {
        const deepLink = `zenzerapp://auth?email=${toEmail}`;

        const mail: Email = {
            to: toEmail,
            subject: 'Invitation to Medical app.',
            text: `${grantedUser.firstName} ${grantedUser.lastName} wants to add you as their medical patient on Medical app. SIGN UP ${deepLink}.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendNotificationToDoctorThatPatientDataAccessWasInitiatedByPatient(
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

    public async sendNotificationToCaregiverThatPatientDataAccessWasInitiatedByPatient(
        patient: User,
        toEmail: string,
    ): Promise<void> {
        const deepLink = `zenzerapp://waiting-room`;

        const mail: Email = {
            to: toEmail,
            subject: 'New incoming request.',
            text: `${patient.firstName} ${patient.lastName} wants to add you as their caregiver. VIEW REQUEST ${deepLink}.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendNotificationThatPatientDataAccessWasInitiatedByGrantedUser(
        grantedUser: User,
        toEmail: string,
    ): Promise<void> {
        const deepLink = `zenzerapp://waiting-room`;

        const mail: Email = {
            to: toEmail,
            subject: 'New incoming request.',
            text: `${grantedUser.firstName} ${grantedUser.lastName} wants to add you as their medical patient. VIEW REQUEST ${deepLink}.`,
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
            subject: 'Invitation request was withdrawn',
            text: `${patient.firstName} ${patient.lastName} has withdrawn their invitation request that was sent to you earlier.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendNotificationThatGrantedUserDeletedDataAccess(grantedUser: User, toEmail: string): Promise<void> {
        const mail: Email = {
            to: toEmail,
            subject: 'Incoming request was withdrawn',
            text: `${grantedUser.firstName} ${grantedUser.lastName} has withdrawn their request that was sent to you earlier.`,
        };

        await this.mailerService.sendMail(mail);
    }
}
