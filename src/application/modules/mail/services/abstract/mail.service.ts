import {User} from 'domain/entities';

export interface IMailService {
    sendInviteToSignUpFromPatientToGrantedUser(patient: User, toEmail: string): Promise<void>;

    sendInviteToSignUpFromGrantedUserToPatient(grantedUser: User, toEmail: string): Promise<void>;

    sendNotificationThatPatientDataAccessWasInitiatedByPatient(patient: User, toEmail: string): Promise<void>;

    sendNotificationThatPatientDataAccessWasInitiatedByGrantedUser(grantedUser: User, toEmail: string): Promise<void>;

    sendNotificationThatUserWasActivated(toEmail: string): Promise<void>;

    sendNotificationThatPatientDeletedDataAccess(patient: User, toEmail: string): Promise<void>;

    sendNotificationThatGrantedUserDeletedDataAccess(grantedUser: User, toEmail: string): Promise<void>;
}

export const IMailService = Symbol('IMailService');
