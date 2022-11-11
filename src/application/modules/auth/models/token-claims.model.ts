export interface ITokenClaimsModel {
    getUserId(): string;
    getTokenExpireTime(): Date;
    getRoles(): string[];
}
