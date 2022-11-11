export class ChangeEmailDto {
    public accessToken: string;

    public email: string;

    constructor(email: string, accessToken: string) {
        this.email = email;
        this.accessToken = accessToken;
    }
}
