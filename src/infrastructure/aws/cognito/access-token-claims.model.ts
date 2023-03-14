import {IAccessTokenClaimsModel} from 'app/modules/auth/models/';

class CLAIMS {
    public static readonly USER_ID = 'sub';
    public static readonly ROLES = 'cognito:groups';
    public static readonly TOKEN_EXPIRE_TIMESTAMP = 'exp';
}

export class AccessTokenClaimsModel implements IAccessTokenClaimsModel {
    private constructor(
        private readonly userId: string,
        private readonly roles: string[],
        private readonly tokenExpireTimestamp: number,
    ) {}

    public getUserId(): string {
        return this.userId;
    }

    public getAccessTokenExpireTime(): Date {
        return new Date(this.tokenExpireTimestamp * 1000);
    }

    public getRoles(): string[] {
        return this.roles;
    }

    public static fromCognitoResponse(accessTokenClaims: object): IAccessTokenClaimsModel {
        return new AccessTokenClaimsModel(
            accessTokenClaims[CLAIMS.USER_ID],
            accessTokenClaims[CLAIMS.ROLES],
            accessTokenClaims[CLAIMS.TOKEN_EXPIRE_TIMESTAMP],
        );
    }
}
