import {Injectable} from '@nestjs/common';
import {
    CognitoIdentityProviderClient,
    AdminInitiateAuthCommand,
    AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class CognitoService {
    private _cognitoProviderConfig = {
        region: 'us-east-1',
    };

    public async signIn(): Promise<string> {
        const client = new CognitoIdentityProviderClient({
            region: 'us-east-1',
            credentials: {
                accessKeyId: '<access_id>',
                secretAccessKey: '<secret>',
            },
        });

        const command = new AdminInitiateAuthCommand({
            UserPoolId: '<pool>',
            ClientId: '<client_id>',
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
