import {PatientDataAccess} from 'domain/entities';
import {IMailService} from 'app/modules/mail/services/mail.service';
import {Inject, Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';

@Injectable()
export class PatientDataAccessListener {
    public constructor(@Inject(IMailService) private mailService: IMailService) {}

    @OnEvent('data-access-for-unregistered-user-initiated')
    public async handleAccessForUnregisteredUserInitiated(patientDataAccess: PatientDataAccess): Promise<void> {
        await this.mailService.sendInviteToSignUp(patientDataAccess.grantedEmail);
    }
}
