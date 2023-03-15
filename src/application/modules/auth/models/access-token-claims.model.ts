export interface IAccessTokenClaimsModel {
    getUserId(): string;
    getAccessTokenExpireTime(): Date;
    getRoles(): string[];
}
