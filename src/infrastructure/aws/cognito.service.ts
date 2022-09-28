import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AuthFlowType,
  SignUpCommand,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import {
  ConfirmSignUpModel,
  SignInModel,
  SignUpModel,
} from 'app/abstractions/models';
import { IAuthService } from 'app/abstractions/auth.service';

interface CognitoProviderConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  userPoolId: string;
  clientId: string;
}

@Injectable()
export class CognitoService implements IAuthService {
  private readonly config: CognitoProviderConfig;
  private readonly cognitoClient: CognitoIdentityProviderClient;

  constructor(private configService: ConfigService) {
    this.config = {
      region: configService.get<string>('AWS_COGNITO_REGION'),
      accessKeyId: configService.get<string>('AWS_COGNITO_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>(
        'AWS_COGNITO_SECRET_ACCESS_KEY',
      ),
      userPoolId: configService.get<string>('AWS_COGNITO_USER_POOL_ID'),
      clientId: configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    };

    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      },
    });
  }

  public async signIn(user: SignInModel): Promise<string> {
    const command = new AdminInitiateAuthCommand({
      UserPoolId: this.config.userPoolId,
      ClientId: this.config.clientId,
      AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
      AuthParameters: {
        [USER_ATTRIBUTES.USER_NAME]: user.userName,
        [USER_ATTRIBUTES.PASSWORD]: user.password,
      },
    });

    try {
      const response = await this.cognitoClient.send(command);
      if (response.ChallengeName == null) {
        return response.AuthenticationResult?.IdToken;
      }

      throw new Error(`Auth challenge ${response.ChallengeName} is required.`);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  public async signUp(user: SignUpModel): Promise<void> {
    const command = new SignUpCommand({
      Username: user.userName,
      Password: user.password,
      ClientId: this.config.clientId,
      UserAttributes: [
        {
          Name: USER_ATTRIBUTES.UPDATED_AT,
          Value: new Date().getTime().toString(),
        },
      ],
    });

    try {
      await this.cognitoClient.send(command);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  public async confirmSignUp(user: ConfirmSignUpModel): Promise<void> {
    const command = new ConfirmSignUpCommand({
      Username: user.userName,
      ConfirmationCode: user.code,
      ClientId: this.config.clientId,
    });

    try {
      await this.cognitoClient.send(command);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

class USER_ATTRIBUTES {
  public static readonly USER_NAME = 'USERNAME';
  public static readonly PASSWORD = 'PASSWORD';

  public static readonly UPDATED_AT = 'updated_at';
}
