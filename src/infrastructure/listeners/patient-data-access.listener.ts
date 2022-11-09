import {User} from 'domain/entities';
import {Inject, Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {AccessToGrantedUserBindingService} from 'app/modules/patient-data-access/services/access-to-granted-user-binding.service';
import {IMailService} from 'app/modules/mail/services/abstract/mail.service';

@Injectable()
export class PatientDataAccessListener {
    public constructor(
        @Inject(IMailService) private mailService: IMailService,
        @Inject(AccessToGrantedUserBindingService)
        private accessToGrantedUserBindingService: AccessToGrantedUserBindingService,
    ) {}

    @OnEvent('patient-initiated-data-access-for-unregistered-doctor')
    public async handleAccessForUnregisteredUserInitiatedByPatient(patient: User, email: string): Promise<void> {
        await this.mailService.sendInviteToSignUpFromPatientToDoctor(patient, email);
    }

    @OnEvent('doctor-initiated-data-access-to-unregistered-patient')
    public async handleAccessForUnregisteredUserInitiatedByDoctor(doctor: User, email: string): Promise<void> {
        await this.mailService.sendInviteToSignUpFromDoctorToPatient(doctor, email);
    }

    @OnEvent('patient-initiated-data-access-for-registered-doctor')
    public async handleAccessForRegisteredUserInitiatedByPatient(patient: User, email: string): Promise<void> {
        await this.mailService.sendNotificationThatPatientDataAccessWasInitiatedByPatient(patient, email);
    }

    @OnEvent('doctor-initiated-data-access-to-registered-patient')
    public async handleAccessForRegisteredUserInitiatedByDoctor(doctor: User, email: string): Promise<void> {
        await this.mailService.sendNotificationThatPatientDataAccessWasInitiatedByDoctor(doctor, email);
    }

    @OnEvent('doctor-created')
    public async handleDoctorCreated(doctor: User): Promise<void> {
        await this.accessToGrantedUserBindingService.bindAccessToGrantedUser(doctor);
    }

    @OnEvent('data-access-deleted-by-patient')
    public async handleAccessDeletedByPatient(patient: User, email: string): Promise<void> {
        await this.mailService.sendNotificationThatPatientDeletedDataAccess(patient, email);
    }

    @OnEvent('data-access-deleted-by-doctor')
    public async handleAccessDeletedByDoctor(doctor: User, email: string): Promise<void> {
        await this.mailService.sendNotificationThatDoctorDeletedDataAccess(doctor, email);
    }
}
