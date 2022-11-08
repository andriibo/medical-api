import {
    ConfirmSignUpModel,
    SignInModel,
    SignUpModel,
    IAuthModel,
    ConfirmForgotPasswordModel,
    ChangeEmailModel,
    ChangePasswordModel,
    ConfirmChangeEmailModel,
} from 'app/modules/auth/models';
import {User} from 'domain/entities';
import {AuthResultModel} from 'app/modules/auth/models';

export interface IAuthService {
    signIn(user: SignInModel): Promise<AuthResultModel>;
    signUp(signUpModel: SignUpModel): Promise<IAuthModel>;
    confirmSignUp(user: ConfirmSignUpModel): Promise<void>;
    resendConfirmSignUpCode(userName: string): Promise<void>;
    getTokenClaims(token: string): Promise<string[]>;
    deleteUser(user: User): Promise<void>;
    forgotPassword(userName: string): Promise<string>;
    confirmForgotPassword(confirmForgotPasswordModel: ConfirmForgotPasswordModel): Promise<void>;
    changePassword(changePasswordModel: ChangePasswordModel): Promise<void>;
    changeEmail(changeEmailModel: ChangeEmailModel): Promise<void>;
    confirmChangeEmail(confirmChangeEmailModel: ConfirmChangeEmailModel): Promise<void>;
}

export const IAuthService = Symbol('IAuthService');
