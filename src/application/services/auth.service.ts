import {ConfirmSignUpModel, SignInModel, SignUpModel} from 'app/models';
import {IAuthModel} from 'app/models/auth.model';
import {User} from 'domain/entities';

export interface IAuthService {
    signIn(user: SignInModel): Promise<string>;
    signUp(signUpModel: SignUpModel): Promise<IAuthModel>;
    confirmSignUp(user: ConfirmSignUpModel): Promise<void>;
    getTokenClaims(token: string): Promise<string[]>;
    deleteUser(user: User): Promise<void>;
}

export const IAuthService = Symbol('IAuthService');
