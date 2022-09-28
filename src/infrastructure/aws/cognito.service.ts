import {Injectable} from '@nestjs/common';
import {
    CognitoIdentityProviderClient,
    AdminInitiateAuthCommand,
    AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider';
import {ConfigService} from '@nestjs/config';

interface CognitoProviderConfig {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    userPoolId: string;
    clientId: string;
}

@Injectable()
export class CognitoService {
    private readonly config: CognitoProviderConfig;

    constructor(private configService: ConfigService) {
        this.config = {
            region: configService.get<string>('AWS_COGNITO_REGION'),
            accessKeyId: configService.get<string>('AWS_COGNITO_ACCESS_KEY_ID'),
            secretAccessKey: configService.get<string>('AWS_COGNITO_SECRET_ACCESS_KEY'),
            userPoolId: configService.get<string>('AWS_COGNITO_USER_POOL_ID'),
            clientId: configService.get<string>('AWS_COGNITO_CLIENT_ID'),
        };
    }

    public async signIn(): Promise<string> {
        const client = new CognitoIdentityProviderClient({
            region: this.config.region,
            credentials: {
                accessKeyId: this.config.accessKeyId,
                secretAccessKey: this.config.secretAccessKey,
            },
        });

        const command = new AdminInitiateAuthCommand({
            UserPoolId: this.config.userPoolId,
            ClientId: this.config.clientId,
            AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
            AuthParameters: {
                [USER_ATTRIBUTES.USER_NAME]: 'thetytn@gmail.com',
                [USER_ATTRIBUTES.PASSWORD]: 'Qwe123!!',
            },
        });

        try {
            const response = await client.send(command);
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }

        return '';
    }
}

class USER_ATTRIBUTES {
    public static readonly USER_NAME = 'USERNAME';
    public static readonly PASSWORD = 'PASSWORD';
}
