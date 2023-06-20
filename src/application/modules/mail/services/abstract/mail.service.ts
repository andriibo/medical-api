import {User} from 'domain/entities';

export interface IMailService {
    sendInviteToSignUpFromPatientToDoctor(patient: User, toEmail: string): Promise<void>;

    sendInviteToSignUpFromPatientToCaregiver(patient: User, toEmail: string): Promise<void>;

    sendInviteToSignUpFromGrantedUserToPatient(grantedUser: User, toEmail: string): Promise<void>;

    sendNotificationToDoctorThatPatientDataAccessWasInitiatedByPatient(patient: User, toEmail: string): Promise<void>;

    sendNotificationToCaregiverThatPatientDataAccessWasInitiatedByPatient(
        patient: User,
        toEmail: string,
    ): Promise<void>;

    sendNotificationThatPatientDataAccessWasInitiatedByGrantedUser(grantedUser: User, toEmail: string): Promise<void>;

    sendNotificationThatUserWasActivated(toEmail: string): Promise<void>;

    sendNotificationThatPatientDeletedDataAccessForDoctor(patient: User, toEmail: string): Promise<void>;

    sendNotificationThatPatientDeletedDataAccessForCaregiver(patient: User, toEmail: string): Promise<void>;

    sendNotificationThatPatientWithdrawnDataAccess(patient: User, toEmail: string): Promise<void>;

    sendNotificationThatGrantedUserDeletedDataAccess(grantedUser: User, toEmail: string): Promise<void>;

    sendNotificationThatGrantedUserWithdrawnDataAccess(grantedUser: User, toEmail: string): Promise<void>;
}

export const IMailService = Symbol('IMailService');
