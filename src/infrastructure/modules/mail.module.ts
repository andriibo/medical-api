import {Module} from '@nestjs/common';
import {MailerModule} from '@nestjs-modules/mailer';
import {IMailService} from 'app/modules/mail/services/mail.service';
import {MailService} from 'infrastructure/nodemailer/mail.service';
import {transportOptions, mailOptions} from 'config/mail.config';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {...transportOptions},
            defaults: {...mailOptions},
        }),
    ],
    exports: [IMailService],
    providers: [
        {
            provide: IMailService,
            useClass: MailService,
        },
    ],
})
export class MailModule {}
