import {
    ConfirmSignUpModel,
    SignInModel,
    SignUpModel,
    IAuthModel,
    ConfirmForgotPasswordModel,
    ChangeEmailModel,
    ChangePasswordModel,
    ConfirmChangeEmailModel,
    ForgotPasswordResponseModel,
    ChangeEmailResponseModel,
    ResendConfirmationCodeResultModel,
    UserAttributesModel,
} from 'app/modules/auth/models';
import {User} from 'domain/entities';
import {AuthResultModel} from 'app/modules/auth/models';

export interface IAuthService {
    signIn(user: SignInModel): Promise<AuthResultModel>;
    signUp(signUpModel: SignUpModel): Promise<IAuthModel>;
    confirmSignUp(user: ConfirmSignUpModel): Promise<void>;
    resendConfirmSignUpCode(email: string): Promise<ResendConfirmationCodeResultModel>;
    getTokenClaimsByToken(token: string): Promise<string[]>;
    getUserAttributes(accessToken: string): Promise<UserAttributesModel>;
    deleteUser(user: User): Promise<void>;
    forgotPassword(email: string): Promise<ForgotPasswordResponseModel>;
    confirmForgotPassword(confirmForgotPasswordModel: ConfirmForgotPasswordModel): Promise<void>;
    changePassword(changePasswordModel: ChangePasswordModel): Promise<void>;
    changeEmail(changeEmailModel: ChangeEmailModel): Promise<ChangeEmailResponseModel>;
    confirmChangeEmail(confirmChangeEmailModel: ConfirmChangeEmailModel): Promise<void>;
}

export const IAuthService = Symbol('IAuthService');
