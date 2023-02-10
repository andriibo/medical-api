import {Email} from 'app/modules/mail/models';

export interface IMailSender {
    sendMail(message: Email): Promise<void>;
}

export const IMailSender = Symbol('IMailSender');
