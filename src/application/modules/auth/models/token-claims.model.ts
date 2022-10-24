export interface ITokenClaimsModel {
    getUserId(): string;
    getUserEmail(): string;
    getTokenExpireTime(): Date;
    getRoles(): string[];
}
