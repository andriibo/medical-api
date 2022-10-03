import {ConfirmSignUpModel, SignInModel, SignUpModel} from 'app/models';
import {IAuthModel} from 'app/models/auth.model';
import {User} from 'domain/entities';

export interface IAuthService {
    signIn(user: SignInModel): Promise<string>;
    signUp(signUpModel: SignUpModel): Promise<IAuthModel>;
    confirmSignUp(user: ConfirmSignUpModel): Promise<void>;
    getTokenClaims(token: string): Promise<string[]>;
    isGroupExist(groupName: string): Promise<boolean>;
    addUserToGroup(userName: string, groupName: string): Promise<void>;
    deleteUser(user: User): Promise<void>;
    createUserGroup(groupName: string): Promise<void>;
}

export const IAuthService = Symbol('IAuthService');
