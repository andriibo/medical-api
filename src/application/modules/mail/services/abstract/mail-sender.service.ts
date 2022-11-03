import {Email} from 'app/modules/mail/models';

export interface IMailSenderService {
    sendMail(message: Email): Promise<void>;
}

export const IMailSenderService = Symbol('IMailSenderService');
