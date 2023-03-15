import {IAccessTokenClaimsModel} from './access-token-claims.model';

export interface IRequestUserModel {
    accessToken: string;
    accessTokenClaims: IAccessTokenClaimsModel;
}
