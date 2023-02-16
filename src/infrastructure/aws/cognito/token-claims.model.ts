import {ITokenClaimsModel} from 'app/modules/auth/models';

class CLAIMS {
    public static readonly USER_ID = 'sub';
    public static readonly ROLES = 'cognito:groups';
    public static readonly TOKEN_EXPIRE_TIMESTAMP = 'exp';
}

export class TokenClaimsModel implements ITokenClaimsModel {
    private constructor(
        private readonly userId: string,
        private readonly roles: string[],
        private readonly tokenExpireTimestamp: number,
    ) {}

    public getUserId(): string {
        return this.userId;
    }

    public getTokenExpireTime(): Date {
        return new Date(this.tokenExpireTimestamp * 1000);
    }

    public getRoles(): string[] {
        return this.roles;
    }

    public static fromCognitoResponse(tokenClaims: object): ITokenClaimsModel {
        return new TokenClaimsModel(
            tokenClaims[CLAIMS.USER_ID],
            tokenClaims[CLAIMS.ROLES],
            tokenClaims[CLAIMS.TOKEN_EXPIRE_TIMESTAMP],
        );
    }
}
