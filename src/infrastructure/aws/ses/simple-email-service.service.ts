import {Injectable} from '@nestjs/common';
import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';
import {SendEmailCommand, SESClient} from '@aws-sdk/client-ses';
import {ConfigService} from '@nestjs/config';
import {Email} from 'app/modules/mail/models';
import {mailOptions} from 'config/mail.config';

interface AwsProviderConfig {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
}

@Injectable()
export class SimpleEmailService implements IMailSenderService {
    private readonly config: AwsProviderConfig;
    private readonly sesClient: SESClient;

    constructor(private configService: ConfigService) {
        this.config = {
            region: configService.get<string>('AWS_REGION'),
            accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        };

        this.sesClient = new SESClient({
            region: this.config.region,
            credentials: {
                accessKeyId: this.config.accessKeyId,
                secretAccessKey: this.config.secretAccessKey,
            },
        });
    }

    public async sendMail(message: Email): Promise<void> {
        const command = new SendEmailCommand({
            Source: mailOptions.from,
            Destination: {
                ToAddresses: [message.to],
            },
            Message: {
                Body: {
                    Html: {
                        Data: message.text,
                        Charset: 'utf8',
                    }
                },
                Subject: {
                    Data: message.subject,
                    Charset: 'utf8',
                },
            }
        });

        await this.sesClient.send(command);
    }
}
