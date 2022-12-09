import {User} from 'domain/entities';

export class UserDto {
    public userId: string;

    public email: string;

    public firstName: string;

    public lastName: string;

    public phone: string;

    public avatar?: string;

    public static fromUser(user: User): UserDto {
        const dto = new UserDto();
        dto.userId = user.id;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.avatar = user.avatar;

        return dto;
    }

    public static fromEmail(email: string): UserDto {
        const dto = new UserDto();
        dto.userId = '';
        dto.email = email;
        dto.firstName = '';
        dto.lastName = '';
        dto.phone = '';

        return dto;
    }
}
