import {Module} from '@nestjs/common';
import {MailerModule, MailerService} from '@nestjs-modules/mailer';
import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';
import {transportOptions, mailOptions} from 'config/mail.config';
import {SimpleEmailService} from 'infrastructure/aws/ses/simple-email-service.service';
import {IMailService} from 'app/modules/mail/services/abstract/mail.service';

import {ConfigService} from '@nestjs/config';
import {MailService} from 'app/modules/mail/services/mail.service';
import {MailhogService} from 'infrastructure/nodemailer/mail.service';

enum MailServiceConfig {
    Amazon_SES = 'Amazon_SES',
    Mailhog = 'Mailhog',
}

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {...transportOptions},
            defaults: {...mailOptions},
        }),
    ],
    exports: [IMailService, IMailSenderService],
    providers: [
        {
            provide: IMailSenderService,
            useFactory: (mailerService: MailerService, configService: ConfigService) => {
                const mailService = configService.get<MailServiceConfig>('MAIL_SERVICE');
                if (mailService === MailServiceConfig.Amazon_SES) {
                    return new SimpleEmailService(configService);
                }
                if (mailService === MailServiceConfig.Mailhog) {
                    return new MailhogService(mailerService);
                }

                throw new Error('MAIL_SERVICE configuration is not valid');
            },
            inject: [MailerService, ConfigService],
        },
        {
            provide: IMailService,
            useClass: MailService,
        },
    ],
})
export class MailModule {}
