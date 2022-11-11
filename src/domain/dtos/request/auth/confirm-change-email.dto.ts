export class ConfirmChangeEmailDto {
    public accessToken: string;

    public code: string;

    constructor(code: string, accessToken: string) {
        this.code = code;
        this.accessToken = accessToken;
    }
}
