import {User} from 'domain/entities';

export interface IMailService {
    sendInviteToSignUp(patient: User, toEmail: string): Promise<void>;

    sendNotificationThatPatientDataAccessWasInitiated(patient: User, toEmail: string): Promise<void>;
}

export const IMailService = Symbol('IMailService');
