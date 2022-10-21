import {ITokenClaimsModel} from 'app/modules/auth/models';

class CLAIMS {
    public static readonly USER_ID = 'sub';
    public static readonly ROLES = 'cognito:groups';
}

export class TokenClaimsModel implements ITokenClaimsModel {
    private constructor(private readonly userId: string, private readonly roles: string[]) {}

    public getUserId(): string {
        return this.userId;
    }

    public getRoles(): string[] {
        return this.roles;
    }

    public static fromCognitoResponse(tokenClaims: object): ITokenClaimsModel {
        return new TokenClaimsModel(tokenClaims[CLAIMS.USER_ID], tokenClaims[CLAIMS.ROLES]);
    }
}
