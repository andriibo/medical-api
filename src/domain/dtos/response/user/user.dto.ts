import {User} from 'domain/entities';

export class UserDto {
    public userId?: string;

    public email: string;

    public firstName?: string;

    public lastName?: string;

    public static fromUser(user: User): UserDto {
        const dto = new UserDto();
        dto.userId = user.id;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;

        return dto;
    }

    public static fromEmail(email: string): UserDto {
        const dto = new UserDto();
        dto.email = email;

        return dto;
    }
}
