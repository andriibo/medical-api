import {
  ConfirmSignUpModel,
  SignInModel,
  SignUpModel,
} from 'app/abstractions/models';

export interface IAuthService {
  signIn(user: SignInModel): Promise<string>;
  signUp(user: SignUpModel): Promise<void>;
  confirmSignUp(user: ConfirmSignUpModel): Promise<void>;
}

export const IAuthService = Symbol('IAuthService');
