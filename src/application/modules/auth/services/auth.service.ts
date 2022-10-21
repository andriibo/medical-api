import {ConfirmSignUpModel, SignInModel, SignUpModel, IAuthModel} from 'app/modules/auth/models';
import {User} from 'domain/entities';

export interface IAuthService {
    signIn(user: SignInModel): Promise<string>;
    signUp(signUpModel: SignUpModel): Promise<IAuthModel>;
    confirmSignUp(user: ConfirmSignUpModel): Promise<void>;
    getTokenClaims(token: string): Promise<string[]>;
    deleteUser(user: User): Promise<void>;
}

export const IAuthService = Symbol('IAuthService');
