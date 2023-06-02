import {
    ConfirmSignUpModel,
    SignInModel,
    SignUpModel,
    IAuthModel,
    ConfirmForgotPasswordModel,
    ChangeEmailModel,
    ChangePasswordModel,
    ConfirmChangeEmailModel,
    UserAttributesModel,
} from 'app/modules/auth/models';
import {User} from 'domain/entities';
import {AuthResultModel} from 'app/modules/auth/models';
import {ChangeEmailResultDto, ConfirmEmailResentDto, ForgotPasswordMailSentDto} from 'domain/dtos/response/auth';

export interface IAuthService {
    signIn(user: SignInModel): Promise<AuthResultModel>;
    signUp(signUpModel: SignUpModel): Promise<IAuthModel>;
    confirmSignUp(user: ConfirmSignUpModel): Promise<void>;
    resendConfirmSignUpCode(email: string): Promise<ConfirmEmailResentDto>;
    getAccessTokenClaimsByAccessToken(accessToken: string): Promise<string[]>;
    getUserAttributes(accessToken: string): Promise<UserAttributesModel>;
    deleteUser(user: User): Promise<void>;
    forgotPassword(email: string): Promise<ForgotPasswordMailSentDto>;
    confirmForgotPassword(confirmForgotPasswordModel: ConfirmForgotPasswordModel): Promise<void>;
    changePassword(changePasswordModel: ChangePasswordModel): Promise<void>;
    changeEmail(changeEmailModel: ChangeEmailModel): Promise<ChangeEmailResultDto>;
    confirmChangeEmail(confirmChangeEmailModel: ConfirmChangeEmailModel): Promise<void>;
}

export const IAuthService = Symbol('IAuthService');
