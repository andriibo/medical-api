import {User} from 'domain/entities';
import {IMailService} from 'app/modules/mail/services/mail.service';
import {Inject, Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';

@Injectable()
export class DoctorDataAccessListener {
    public constructor(@Inject(IMailService) private mailService: IMailService) {}

    @OnEvent('data-access-for-patient-deleted')
    public async handleAccessForPatientDeleted(doctor: User, email: string): Promise<void> {
        await this.mailService.sendNotificationThatDoctorDataAccessWasDeleted(doctor, email);
    }
}
