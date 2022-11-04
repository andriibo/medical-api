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

    @OnEvent('data-access-for-unregistered-user-initiated')
    public async handleAccessForUnregisteredUserInitiated(patient: User, email: string): Promise<void> {
        await this.mailService.sendInviteToSignUp(patient, email);
    }

    @OnEvent('data-access-for-registered-user-initiated')
    public async handleAccessForRegisteredUserInitiated(patient: User, email: string): Promise<void> {
        await this.mailService.sendNotificationThatPatientDataAccessWasInitiated(patient, email);
    }

    @OnEvent('doctor-created')
    public async handleDoctorCreated(doctor: User): Promise<void> {
        await this.accessToGrantedUserBindingService.bindAccessToGrantedUser(doctor);
    }

    @OnEvent('data-access-for-doctor-deleted')
    public async handleAccessForDoctorDeleted(patient: User, email: string): Promise<void> {
        await this.mailService.sendNotificationThatPatientDataAccessWasDeleted(patient, email);
    }
}
