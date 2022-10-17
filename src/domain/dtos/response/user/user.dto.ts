import {User} from 'domain/entities';

export class UserDto {
    userId: string;

    email: string;

    firstName: string;

    lastName: string;

    static fromUser(user: User): UserDto {
        const dto = new UserDto();
        dto.userId = user.userId;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;

        return dto;
    }
}
