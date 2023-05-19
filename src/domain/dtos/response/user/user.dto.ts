export class UserDto {
    public userId: string;

    public email: string | null;

    public firstName: string;

    public lastName: string;

    public phone: string;

    public avatar: string | null = null;

    public role: string;

    public roleLabel: string;

    public deletedAt: number | null = null;

    public passwordUpdatedAt: number;
}
