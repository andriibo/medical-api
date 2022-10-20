import {Injectable, BadRequestException} from '@nestjs/common';
import {
    CognitoIdentityProviderClient,
    AdminInitiateAuthCommand,
    AuthFlowType,
    SignUpCommand,
    ConfirmSignUpCommand,
    AdminAddUserToGroupCommand,
    CreateGroupCommand,
    GetGroupCommand,
    AdminDeleteUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import {ConfigService} from '@nestjs/config';
import {ConfirmSignUpModel, SignInModel, SignUpModel} from 'app/models';
import {IAuthService} from 'app/services/auth.service';
import * as jwt from 'jsonwebtoken';
import * as jwkToBuffer from 'jwk-to-pem';
import {User} from 'domain/entities/user.entity';
import {AuthModel} from './auth.model';
import {IAuthModel} from 'app/models/auth.model';

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

    public constructor(private configService: ConfigService) {
        this.config = {
            region: configService.get<string>('AWS_COGNITO_REGION'),
            accessKeyId: configService.get<string>('AWS_COGNITO_ACCESS_KEY_ID'),
            secretAccessKey: configService.get<string>('AWS_COGNITO_SECRET_ACCESS_KEY'),
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
            console.error(error.message);
            throw new BadRequestException(error.message);
        }
    }

    public async signUp(signUpModel: SignUpModel): Promise<IAuthModel> {
        const command = new SignUpCommand({
            Username: signUpModel.userName,
            Password: signUpModel.password,
            ClientId: this.config.clientId,
            UserAttributes: [
                {
                    Name: USER_ATTRIBUTES.UPDATED_AT,
                    Value: new Date().getTime().toString(),
                },
            ],
        });

        try {
            const user = await this.cognitoClient.send(command);

            await this.setUserRole(signUpModel);

            return new AuthModel(user);
        } catch (error) {
            console.error(error.message);
            throw new BadRequestException(error.message);
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
            console.error(error.message);
            throw new BadRequestException(error.message);
        }
    }

    public async deleteUser(user: User): Promise<void> {
        const command = new AdminDeleteUserCommand({
            UserPoolId: this.config.userPoolId,
            Username: user.userId,
        });

        try {
            await this.cognitoClient.send(command);
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    public async getTokenClaims(token: string): Promise<any> {
        const tokenISS = `https://cognito-idp.${this.config.region}.amazonaws.com/${this.config.userPoolId}`;
        const response = await fetch(`${tokenISS}/.well-known/jwks.json`);
        const userPoolJwk = await response.json();
        const pem = jwkToBuffer(userPoolJwk.keys[0]);

        return await new Promise((resolve, reject) => {
            jwt.verify(token, pem, {algorithms: ['RS256']}, (err, decodedToken) => {
                if (this.isTokenValid(decodedToken, tokenISS)) {
                    resolve(decodedToken);
                } else {
                    reject(err);
                }
            });
        });
    }

    private async isGroupExist(groupName: string): Promise<boolean> {
        const command = new GetGroupCommand({
            GroupName: groupName,
            UserPoolId: this.config.userPoolId,
        });

        try {
            const group = await this.cognitoClient.send(command);
            return group.Group?.GroupName === groupName;
        } catch (error) {
            if (error.name === 'ResourceNotFoundException') {
                return false;
            }

            console.log(error.message);
            throw error;
        }
    }

    private async createUserGroup(groupName: string): Promise<void> {
        const command = new CreateGroupCommand({
            GroupName: groupName,
            UserPoolId: this.config.userPoolId,
        });

        try {
            await this.cognitoClient.send(command);
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    private async addUserToGroup(userName: string, groupName: string): Promise<void> {
        const command = new AdminAddUserToGroupCommand({
            Username: userName,
            GroupName: groupName,
            UserPoolId: this.config.userPoolId,
        });

        try {
            await this.cognitoClient.send(command);
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    private async setUserRole(signUpModel: SignUpModel): Promise<void> {
        const isGroupExist = await this.isGroupExist(signUpModel.role);
        if (!isGroupExist) {
            await this.createUserGroup(signUpModel.role);
        }

        await this.addUserToGroup(signUpModel.userName, signUpModel.role);
    }

    private isTokenValid(decodedToken, tokenISS): boolean {
        return (
            decodedToken &&
            this.isTokenNotExpired(decodedToken) &&
            this.isTokenAudienceValid(decodedToken) &&
            this.isTokenIssuerValid(decodedToken, tokenISS)
        );
    }

    private isTokenNotExpired(decodedToken): boolean {
        const tokenExpireDate = new Date(decodedToken.exp * 1000);
        return new Date() < tokenExpireDate;
    }

    private isTokenAudienceValid(decodedToken): boolean {
        return decodedToken.aud === this.config.clientId;
    }

    private isTokenIssuerValid(decodedToken, tokenISS): boolean {
        return decodedToken.iss === tokenISS;
    }
}

class USER_ATTRIBUTES {
    public static readonly USER_NAME = 'USERNAME';
    public static readonly PASSWORD = 'PASSWORD';

    public static readonly UPDATED_AT = 'updated_at';
}
