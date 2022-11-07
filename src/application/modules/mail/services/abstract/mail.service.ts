import {User} from 'domain/entities';

export interface IMailService {
    sendInviteToSignUpByPatient(patient: User, toEmail: string): Promise<void>;

    sendInviteToSignUpByDoctor(patient: User, toEmail: string): Promise<void>;

    sendNotificationThatPatientDataAccessWasInitiatedByPatient(patient: User, toEmail: string): Promise<void>;

    sendNotificationThatPatientDataAccessWasInitiatedByDoctor(doctor: User, toEmail: string): Promise<void>;

    sendNotificationThatUserWasActivated(toEmail: string): Promise<void>;

    sendNotificationThatPatientDeletedDataAccess(patient: User, toEmail: string): Promise<void>;

    sendNotificationThatDoctorDeletedDataAccess(doctor: User, toEmail: string): Promise<void>;
}

export const IMailService = Symbol('IMailService');
