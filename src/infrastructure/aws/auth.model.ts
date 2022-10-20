import {IAuthModel} from 'app/models/auth.model';
import {SignUpResponse} from '@aws-sdk/client-cognito-identity-provider/dist-types/models/models_1';
import {AuthError} from './auth.error';

export class AuthModel implements IAuthModel {
    private readonly userId: string;

    public constructor(cognitoUser: SignUpResponse) {
        if (typeof cognitoUser.UserSub === 'undefined') {
            throw new AuthError('User ID Is Absent.');
        }

        this.userId = cognitoUser.UserSub;
    }

    public getUserId(): string {
        return this.userId;
    }
}
