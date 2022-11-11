export class ChangePasswordDto {
    public accessToken: string;

    public currentPassword: string;

    public newPassword: string;

    constructor(currentPassword: string, newPassword: string, accessToken: string) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.accessToken = accessToken;
    }
}
