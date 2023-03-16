export class AuthResultModel {
    public accessToken: string;
    public accessTokenExpireTime: number;
    public refreshToken: string | null;
}
