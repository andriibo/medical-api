import {PatientDataAccess, User} from 'domain/entities';
import {IMailService} from 'app/modules/mail/services/mail.service';
import {Inject, Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {AccessToGrantedUserBindingService} from 'app/modules/patient-data-access/services/access-to-granted-user-binding.service';

@Injectable()
export class PatientDataAccessListener {
    public constructor(
        @Inject(IMailService) private mailService: IMailService,
        @Inject(AccessToGrantedUserBindingService)
        private accessToGrantedUserBindingService: AccessToGrantedUserBindingService,
    ) {}

    @OnEvent('data-access-for-unregistered-user-initiated')
    public async handleAccessForUnregisteredUserInitiated(patientDataAccess: PatientDataAccess): Promise<void> {
        await this.mailService.sendInviteToSignUp(patientDataAccess.grantedEmail);
    }

    @OnEvent('doctor-created')
    public async handleDoctorCreated(doctor: User): Promise<void> {
        await this.accessToGrantedUserBindingService.bindAccessToGrantedUser(doctor);
    }
}
