import {MailerService} from '@nestjs-modules/mailer';
import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';
import {Injectable} from '@nestjs/common';
import {Email} from 'app/modules/mail/models';

@Injectable()
export class MailhogService implements IMailSenderService {
    public constructor(private mailerService: MailerService) {}

    public async sendMail(message: Email): Promise<void> {
        await this.mailerService.sendMail(message);
    }

    public async sendNotificationThatPatientDataAccessWasDeleted(patient: User, toEmail: string): Promise<void> {
        await this.mailerService.sendMail({
            to: toEmail,
            subject: 'You were removed from list of doctors',
            text: `${patient.firstName} ${patient.lastName} has removed you from the list of their doctors. You no longer have access to the patient account.`,
        });
    }

    public async sendNotificationThatDoctorDataAccessWasDeleted(doctor: User, toEmail: string): Promise<void> {
        await this.mailerService.sendMail({
            to: toEmail,
            subject: 'You were removed from list of patients',
            text: `${doctor.firstName} ${doctor.lastName} has removed you from the list of their patients and doesn't have access to your account anymore.`,
        });
    }
}
