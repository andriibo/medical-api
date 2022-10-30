import {Injectable} from '@nestjs/common';
import {IMailService} from 'app/modules/mail/services/mail.service';
import {SendEmailCommand, SESClient} from '@aws-sdk/client-ses';
import {ConfigService} from '@nestjs/config';

interface AwsProviderConfig {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
}

@Injectable()
export class SimpleEmailService implements IMailService {
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

    public async sendInviteToSignUp(email: string): Promise<void> {
        const command = new SendEmailCommand({
            Source: 'no-reply@medical.com',
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Html: {
                        Data: `You are invited to the Zenzerapp. Please, follow the link: zenzerapp://auth?email=${email}.`,
                        Charset: 'utf8',
                    }
                },
                Subject: {
                    Data: 'Invite to Sign Up.',
                    Charset: 'utf8',
                },
            }
        });

        await this.sesClient.send(command);
    }
}
