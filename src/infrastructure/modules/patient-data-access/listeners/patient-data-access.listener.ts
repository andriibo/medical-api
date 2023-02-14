import {PatientDataAccess, User} from 'domain/entities';
import {Inject, Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {AccessToGrantedUserBindingService} from 'app/modules/patient-data-access/services/access-to-granted-user-binding.service';
import {IMailService} from 'app/modules/mail/services/abstract/mail.service';
import {AccessToPatientBindingService} from 'app/modules/patient-data-access/services/access-to-patient-binding.service';
import {IDataAccessApprovedService} from 'app/modules/patient-data-access/services/data-access-approved.service';

@Injectable()
export class PatientDataAccessListener {
    public constructor(
        @Inject(IMailService) private mailService: IMailService,
        @Inject(AccessToGrantedUserBindingService)
        private accessToGrantedUserBindingService: AccessToGrantedUserBindingService,
        @Inject(AccessToPatientBindingService)
        private accessToPatientBindingService: AccessToPatientBindingService,
        @Inject(IDataAccessApprovedService)
        private dataAccessApprovedService: IDataAccessApprovedService,
    ) {}

    @OnEvent('patient-initiated-data-access-for-unregistered-doctor')
    public async handleAccessForUnregisteredDoctorInitiatedByPatient(patient: User, email: string): Promise<void> {
        await this.mailService.sendInviteToSignUpFromPatientToDoctor(patient, email);
    }

    @OnEvent('patient-initiated-data-access-for-unregistered-caregiver')
    public async handleAccessForUnregisteredCaregiverInitiatedByPatient(patient: User, email: string): Promise<void> {
        await this.mailService.sendInviteToSignUpFromPatientToCaregiver(patient, email);
    }

    @OnEvent('granted-user-initiated-data-access-to-unregistered-patient')
    public async handleAccessForUnregisteredUserInitiatedByGrantedUser(
        grantedUser: User,
        email: string,
    ): Promise<void> {
        await this.mailService.sendInviteToSignUpFromGrantedUserToPatient(grantedUser, email);
    }

    @OnEvent('patient-initiated-data-access-for-registered-doctor')
    public async handleAccessForRegisteredDoctorInitiatedByPatient(patient: User, email: string): Promise<void> {
        await this.mailService.sendNotificationToDoctorThatPatientDataAccessWasInitiatedByPatient(patient, email);
    }

    @OnEvent('patient-initiated-data-access-for-registered-caregiver')
    public async handleAccessForRegisteredCaregiverInitiatedByPatient(patient: User, email: string): Promise<void> {
        await this.mailService.sendNotificationToCaregiverThatPatientDataAccessWasInitiatedByPatient(patient, email);
    }

    @OnEvent('granted-user-initiated-data-access-to-registered-patient')
    public async handleAccessForRegisteredUserInitiatedByGrantedUser(grantedUser: User, email: string): Promise<void> {
        await this.mailService.sendNotificationThatPatientDataAccessWasInitiatedByGrantedUser(grantedUser, email);
    }

    @OnEvent('doctor-created')
    public async handleDoctorCreated(doctor: User): Promise<void> {
        await this.accessToGrantedUserBindingService.bindAccessToGrantedUser(doctor);
    }

    @OnEvent('patient-created')
    public async handlePatientCreated(patient: User): Promise<void> {
        await this.accessToPatientBindingService.bindAccessToPatient(patient);
    }

    @OnEvent('caregiver-created')
    public async handleCaregiverCreated(caregiver: User): Promise<void> {
        await this.accessToGrantedUserBindingService.bindAccessToGrantedUser(caregiver);
    }

    @OnEvent('data-access-deleted-by-patient')
    public async handleAccessDeletedByPatient(patient: User, grantedEmail: string): Promise<void> {
        await this.mailService.sendNotificationThatPatientDeletedDataAccess(patient, grantedEmail);
    }

    @OnEvent('data-access-withdrawn-by-patient')
    public async handleAccessWithdrawnByPatient(patient: User, grantedEmail: string): Promise<void> {
        await this.mailService.sendNotificationThatPatientWithdrawnDataAccess(patient, grantedEmail);
    }

    @OnEvent('data-access-deleted-by-granted-user')
    public async handleAccessDeletedByGrantedUser(grantedUser: User, patientEmail: string): Promise<void> {
        await this.mailService.sendNotificationThatGrantedUserDeletedDataAccess(grantedUser, patientEmail);
    }

    @OnEvent('data-access-withdrawn-by-granted-user')
    public async handleAccessWithdrawnByGrantedUser(grantedUser: User, patientEmail: string): Promise<void> {
        await this.mailService.sendNotificationThatGrantedUserWithdrawnDataAccess(grantedUser, patientEmail);
    }

    @OnEvent('data-access-approved')
    public async handleAccessApproved(dataAccess: PatientDataAccess): Promise<void> {
        await this.dataAccessApprovedService.handle(dataAccess);
    }
}
