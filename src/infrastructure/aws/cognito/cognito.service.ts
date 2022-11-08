import {Injectable} from '@nestjs/common';
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
    AuthenticationResultType,
    ForgotPasswordCommand,
    ConfirmForgotPasswordCommand,
    ResendConfirmationCodeCommand,
    ChangePasswordCommand,
    UpdateUserAttributesCommand,
    VerifyUserAttributeCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import {ConfigService} from '@nestjs/config';
import {
    ConfirmSignUpModel,
    SignInModel,
    SignUpModel,
    IAuthModel,
    AuthResultModel,
    ChangeEmailModel,
    ChangePasswordModel,
    ConfirmForgotPasswordModel,
    ConfirmChangeEmailModel,
} from 'app/modules/auth/models';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import * as jwt from 'jsonwebtoken';
import * as jwkToBuffer from 'jwk-to-pem';
import {User} from 'domain/entities/user.entity';
import {AuthModel} from './auth.model';
import {AuthServiceError} from 'app/errors';

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
            region: configService.get<string>('AWS_REGION'),
            accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
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

    public async signIn(user: SignInModel): Promise<AuthResultModel> {
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
                return this.getAuthResult(response.AuthenticationResult);
            }

            throw new Error(`Auth challenge ${response.ChallengeName} is required.`);
        } catch (error) {
            console.error(error.message);
            throw new AuthServiceError(error.message);
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
            throw new AuthServiceError(error.message);
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
            throw new AuthServiceError(error.message);
        }
    }

    public async resendConfirmSignUpCode(userName: string): Promise<void> {
        const command = new ResendConfirmationCodeCommand({
            Username: userName,
            ClientId: this.config.clientId,
        });

        try {
            await this.cognitoClient.send(command);
        } catch (error) {
            console.error(error.message);
            throw new AuthServiceError(error.message);
        }
    }

    public async deleteUser(user: User): Promise<void> {
        const command = new AdminDeleteUserCommand({
            UserPoolId: this.config.userPoolId,
            Username: user.id,
        });

        try {
            await this.cognitoClient.send(command);
        } catch (error) {
            console.log(error.message);
            throw new AuthServiceError(error.message);
        }
    }

    public async getTokenClaims(token: string): Promise<any> {
        const tokenISS = `https://cognito-idp.${this.config.region}.amazonaws.com/${this.config.userPoolId}`;
        const response = await fetch(`${tokenISS}/.well-known/jwks.json`);
        const userPoolJwk = await response.json();
        const pem = jwkToBuffer(userPoolJwk.keys[USER_POOL_JWK.ID_TOKEN]);

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

    public async forgotPassword(userName: string): Promise<string> {
        const command = new ForgotPasswordCommand({
            ClientId: this.config.clientId,
            Username: userName,
        });

        try {
            const response = await this.cognitoClient.send(command);

            return `Confirmation code was send to ${response.CodeDeliveryDetails.Destination}`;
        } catch (error) {
            console.error(error.message);
            throw new AuthServiceError(error.message);
        }
    }

    public async confirmForgotPassword(confirmForgotPasswordModel: ConfirmForgotPasswordModel): Promise<void> {
        const command = new ConfirmForgotPasswordCommand({
            ClientId: this.config.clientId,
            Username: confirmForgotPasswordModel.userName,
            ConfirmationCode: confirmForgotPasswordModel.code,
            Password: confirmForgotPasswordModel.password,
        });

        try {
            await this.cognitoClient.send(command);
        } catch (error) {
            console.error(error.message);
            throw new AuthServiceError(error.message);
        }
    }

    public async changePassword(changePasswordModel: ChangePasswordModel): Promise<void> {
        const command = new ChangePasswordCommand({
            AccessToken: changePasswordModel.accessToken,
            PreviousPassword: changePasswordModel.currentPassword,
            ProposedPassword: changePasswordModel.newPassword,
        });

        try {
            await this.cognitoClient.send(command);
        } catch (error) {
            console.error(error.message);
            throw new AuthServiceError(error.message);
        }
    }

    public async changeEmail(changeEmailModel: ChangeEmailModel): Promise<void> {
        const command = new UpdateUserAttributesCommand({
            AccessToken: changeEmailModel.accessToken,
            UserAttributes: [
                {
                    Name: USER_ATTRIBUTES.EMIAL,
                    Value: changeEmailModel.newEmail,
                }
            ],
        });

        try {
            await this.cognitoClient.send(command);
        } catch (error) {
            console.error(error.message);
            throw new AuthServiceError(error.message);
        }
    }

    public async confirmChangeEmail(confirmChangeEmailModel: ConfirmChangeEmailModel): Promise<void> {
        const command = new VerifyUserAttributeCommand({
            AccessToken: confirmChangeEmailModel.accessToken,
            AttributeName: USER_ATTRIBUTES.EMIAL,
            Code: confirmChangeEmailModel.code,
        });

        try {
            await this.cognitoClient.send(command);
        } catch (error) {
            console.error(error.message);
            throw new AuthServiceError(error.message);
        }
    }

    private getAuthResult(authResult: AuthenticationResultType): AuthResultModel {
        const authResultModel = new AuthResultModel();
        authResultModel.token = authResult.IdToken;
        authResultModel.tokenExpireTime = authResult.ExpiresIn;

        return authResultModel;
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
            throw new AuthServiceError(error.message);
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
            throw new AuthServiceError(error.message);
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
            throw new AuthServiceError(error.message);
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
        return decodedToken.token_use == 'access'
            ? decodedToken.client_id === this.config.clientId
            : decodedToken.aud === this.config.clientId;
    }

    private isTokenIssuerValid(decodedToken, tokenISS): boolean {
        return decodedToken.iss === tokenISS;
    }
}

class USER_ATTRIBUTES {
    public static readonly USER_NAME = 'USERNAME';
    public static readonly EMIAL = 'email';
    public static readonly PASSWORD = 'PASSWORD';

    public static readonly UPDATED_AT = 'updated_at';
}

class USER_POOL_JWK {
    public static readonly AUTH_TOKEN = 1;
    public static readonly ID_TOKEN = 0;
}
