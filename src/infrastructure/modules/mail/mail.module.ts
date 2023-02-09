import {Module} from '@nestjs/common';
import {MailerModule, MailerService} from '@nestjs-modules/mailer';
import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';
import {transportOptions, mailOptions} from 'config/mail.config';
import {SesService} from 'infrastructure/aws/ses/ses.service';
import {IMailService} from 'app/modules/mail/services/abstract/mail.service';
import {ConfigService} from '@nestjs/config';
import {MailService} from 'app/modules/mail/services/mail.service';
import {MailhogService} from './services/mailhog.service';
import {MailServiceConfig} from './mail-service.config';
import {BranchIoService} from 'infrastructure/services/branch-io.service';
import {IBranchIoService} from 'app/modules/mail/services/branch-io.service';

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
                    return new SesService(configService);
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
            useFactory: (mailSenderService: IMailSenderService, branchIoService: IBranchIoService) => {
                return new MailService(mailSenderService, branchIoService);
            },
            inject: [IMailSenderService, IBranchIoService],
        },
        {
            provide: IBranchIoService,
            useFactory: (configService: ConfigService) => {
                return new BranchIoService(configService);
            },
            inject: [ConfigService],
        },
    ],
})
export class MailModule {}
