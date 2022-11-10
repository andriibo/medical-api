import {ITokenClaimsModel} from './token-claims.model';

export interface IRequestUserModel {
    token: string;
    tokenClaims: ITokenClaimsModel;
}
