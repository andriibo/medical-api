import {ITokenClaimsModel} from 'app/models/token-claims.model';

class CLAIMS {
    public static readonly USER_ID = 'sub';
    public static readonly ROLES = 'cognito:groups';
}

export class TokenClaimsModel implements ITokenClaimsModel {
    protected constructor(private readonly userId: string, private readonly roles: string[]) {}

    getUserId(): string {
        return this.userId;
    }

    getRoles(): string[] {
        return this.roles;
    }

    static fromCognitoResponse(tokenClaims: object): ITokenClaimsModel {
        return new TokenClaimsModel(tokenClaims[CLAIMS.USER_ID], tokenClaims[CLAIMS.ROLES]);
    }
}
