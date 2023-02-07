import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';
import {User} from 'domain/entities';
import {IMailService} from 'app/modules/mail/services/abstract/mail.service';
import {Email} from 'app/modules/mail/models';
import {BranchIoService} from 'infrastructure/services/branch-io.service';

export class MailService implements IMailService {
    public constructor(
        private readonly mailerService: IMailSenderService,
        private readonly branchService: BranchIoService,
    ) {}

    public async sendInviteToSignUpFromPatientToDoctor(patient: User, toEmail: string): Promise<void> {
        const deepLink = await this.branchService.signUpLinkForDoctor(toEmail);

        const mail: Email = {
            to: toEmail,
            subject: 'Invitation to Medical app.',
            text: `${patient.firstName} ${patient.lastName} wants to add you as their medical doctor on Medical app. <a href="${deepLink}">SIGN UP</a>.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendInviteToSignUpFromPatientToCaregiver(patient: User, toEmail: string): Promise<void> {
        const deepLink = await this.branchService.signUpLinkForCaregiver(toEmail);

        const mail: Email = {
            to: toEmail,
            subject: 'Invitation to Medical app.',
            text: `${patient.firstName} ${patient.lastName} wants to add you as their caregiver on Medical app. <a href="${deepLink}">SIGN UP</a>.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendInviteToSignUpFromGrantedUserToPatient(grantedUser: User, toEmail: string): Promise<void> {
        const deepLink = await this.branchService.signUpLinkForPatient(toEmail);

        const mail: Email = {
            to: toEmail,
            subject: 'Invitation to Medical app.',
            text: `${grantedUser.firstName} ${grantedUser.lastName} wants to add you as their medical patient on Medical app. <a href="${deepLink}">SIGN UP</a>.`,
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
            text: `${patient.firstName} ${patient.lastName} wants to add you as their medical doctor. <a href="${deepLink}">VIEW REQUEST</a>.`,
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
            text: `${patient.firstName} ${patient.lastName} wants to add you as their caregiver. <a href="${deepLink}">VIEW REQUEST</a>.`,
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
            text: `${grantedUser.firstName} ${grantedUser.lastName} wants to add you as their medical patient. <a href="${deepLink}">VIEW REQUEST</a>.`,
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

    public async sendNotificationThatPatientWithdrawnDataAccess(patient: User, toEmail: string): Promise<void> {
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
            subject: 'You were removed from list of patients',
            text: `${grantedUser.firstName} ${grantedUser.lastName} has removed you from the list of their patients and doesn't have access to your account anymore.`,
        };

        await this.mailerService.sendMail(mail);
    }

    public async sendNotificationThatGrantedUserWithdrawnDataAccess(grantedUser: User, toEmail: string): Promise<void> {
        const mail: Email = {
            to: toEmail,
            subject: 'Incoming request was withdrawn',
            text: `${grantedUser.firstName} ${grantedUser.lastName} has withdrawn their request that was sent to you earlier.`,
        };

        await this.mailerService.sendMail(mail);
    }
}
