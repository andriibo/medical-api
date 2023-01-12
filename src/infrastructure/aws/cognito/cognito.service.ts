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
    ForgotPasswordResponse,
    UpdateUserAttributesResponse,
    ResendConfirmationCodeResponse,
    GetUserCommand,
    AttributeType,
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
    ForgotPasswordResponseModel,
    ChangeEmailResponseModel,
    ResendConfirmationCodeResultModel,
    UserAttributesModel,
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

    public constructor(private readonly configService: ConfigService) {
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
                [USER_ATTRIBUTES.USER_NAME]: user.email,
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
            Username: signUpModel.email,
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
            Username: user.email,
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

    public async resendConfirmSignUpCode(email: string): Promise<ResendConfirmationCodeResultModel> {
        const command = new ResendConfirmationCodeCommand({
            Username: email,
            ClientId: this.config.clientId,
        });

        try {
            const response = await this.cognitoClient.send(command);

            return this.getResendCodeResult(response);
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
        const userPoolJwk = JSON.parse(this.configService.get<string>('AWS_COGNITO_JWKS'));
        const pem = jwkToBuffer(userPoolJwk.keys[USER_POOL_JWK.AUTH_TOKEN]);

        return await new Promise((resolve, reject) => {
            jwt.verify(token, pem, {algorithms: ['RS256']}, (err, decodedToken) => {
                if (this.isTokenValid(decodedToken)) {
                    resolve(decodedToken);
                } else {
                    reject(err);
                }
            });
        });
    }

    public async forgotPassword(email: string): Promise<ForgotPasswordResponseModel> {
        const command = new ForgotPasswordCommand({
            ClientId: this.config.clientId,
            Username: email,
        });

        try {
            const response = await this.cognitoClient.send(command);

            return this.getForgotPasswordResult(response);
        } catch (error) {
            console.error(error.message);
            throw new AuthServiceError(error.message);
        }
    }

    public async confirmForgotPassword(confirmForgotPasswordModel: ConfirmForgotPasswordModel): Promise<void> {
        const command = new ConfirmForgotPasswordCommand({
            ClientId: this.config.clientId,
            Username: confirmForgotPasswordModel.email,
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

    public async changeEmail(changeEmailModel: ChangeEmailModel): Promise<ChangeEmailResponseModel> {
        const command = new UpdateUserAttributesCommand({
            AccessToken: changeEmailModel.accessToken,
            UserAttributes: [
                {
                    Name: USER_ATTRIBUTES.EMIAL,
                    Value: changeEmailModel.newEmail,
                },
            ],
        });

        try {
            const response = await this.cognitoClient.send(command);

            return this.getChangeEmailResult(response);
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

    public async getUserAttributes(accessToken: string): Promise<UserAttributesModel> {
        const command = new GetUserCommand({
            AccessToken: accessToken,
        });

        try {
            const result = await this.cognitoClient.send(command);

            return this.getUserAttributesResult(result.UserAttributes);
        } catch (error) {
            console.error(error.message);
            throw new AuthServiceError(error.message);
        }
    }

    private getAuthResult(authResult: AuthenticationResultType): AuthResultModel {
        const authResultModel = new AuthResultModel();
        authResultModel.token = authResult.AccessToken;
        authResultModel.tokenExpireTime = authResult.ExpiresIn;

        return authResultModel;
    }

    private getForgotPasswordResult(forgotPasswordResponse: ForgotPasswordResponse): ForgotPasswordResponseModel {
        return {
            destination: forgotPasswordResponse?.CodeDeliveryDetails?.Destination,
            attributeName: forgotPasswordResponse?.CodeDeliveryDetails?.AttributeName,
            deliveryMedium: forgotPasswordResponse?.CodeDeliveryDetails?.DeliveryMedium,
        };
    }

    private getChangeEmailResult(updateUserAttributesResponse: UpdateUserAttributesResponse): ChangeEmailResponseModel {
        const emailDeliveryDetails = updateUserAttributesResponse?.CodeDeliveryDetailsList?.pop();

        return {
            destination: emailDeliveryDetails?.Destination,
            attributeName: emailDeliveryDetails?.AttributeName,
            deliveryMedium: emailDeliveryDetails?.DeliveryMedium,
        };
    }

    private getResendCodeResult(
        resendConfirmationCodeResponse: ResendConfirmationCodeResponse,
    ): ResendConfirmationCodeResultModel {
        const emailDeliveryDetails = resendConfirmationCodeResponse?.CodeDeliveryDetails;

        return {
            destination: emailDeliveryDetails?.Destination,
            attributeName: emailDeliveryDetails?.AttributeName,
            deliveryMedium: emailDeliveryDetails?.DeliveryMedium,
        };
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

    private async addUserToGroup(email: string, groupName: string): Promise<void> {
        const command = new AdminAddUserToGroupCommand({
            Username: email,
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

        await this.addUserToGroup(signUpModel.email, signUpModel.role);
    }

    private isTokenValid(decodedToken): boolean {
        return (
            decodedToken &&
            this.isTokenNotExpired(decodedToken) &&
            this.isTokenAudienceValid(decodedToken) &&
            this.isTokenIssuerValid(decodedToken)
        );
    }

    private isTokenNotExpired(decodedToken): boolean {
        const tokenExpireDate = new Date(decodedToken.exp * 1000);
        return new Date() < tokenExpireDate;
    }

    private isTokenAudienceValid(decodedToken): boolean {
        return decodedToken.token_use === 'access'
            ? decodedToken.client_id === this.config.clientId
            : decodedToken.aud === this.config.clientId;
    }

    private isTokenIssuerValid(decodedToken): boolean {
        const tokenISS = `https://cognito-idp.${this.config.region}.amazonaws.com/${this.config.userPoolId}`;
        return decodedToken.iss === tokenISS;
    }

    private getUserAttributesResult(attributes: AttributeType[]): UserAttributesModel {
        const userAttributes = new UserAttributesModel();
        userAttributes.sub = this.getAttributeValueByName(attributes, USER_ATTRIBUTES.USER_SUB);
        userAttributes.email = this.getAttributeValueByName(attributes, USER_ATTRIBUTES.EMIAL);
        userAttributes.emailVerified = this.getAttributeValueByName(attributes, USER_ATTRIBUTES.EMIAL_VERIFIED);
        userAttributes.updatedAt = this.getAttributeValueByName(attributes, USER_ATTRIBUTES.UPDATED_AT);

        return userAttributes;
    }

    private getAttributeValueByName(attributes: AttributeType[], name: string): string {
        const attribute = attributes.find((attribute) => attribute.Name === name);
        return Boolean(attribute) ? attribute.Value : null;
    }
}

class USER_ATTRIBUTES {
    public static readonly USER_NAME = 'USERNAME';
    public static readonly EMIAL = 'email';
    public static readonly PASSWORD = 'PASSWORD';

    public static readonly EMIAL_VERIFIED = 'email_verified';
    public static readonly USER_SUB = 'sub';
    public static readonly UPDATED_AT = 'updated_at';
}

class USER_POOL_JWK {
    public static readonly AUTH_TOKEN = 1;
    public static readonly ID_TOKEN = 0;
}
