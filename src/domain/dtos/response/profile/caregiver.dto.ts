import {User} from 'domain/entities/user.entity';

export class CaregiverDto {
    public email: string;

    public firstName: string;

    public lastName: string;

    public phone: string;

    public avatar: string;

    public static fromUser<T extends typeof CaregiverDto>(this: T, user: User): InstanceType<T> {
        const dto = new this() as InstanceType<T>;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.avatar = user.avatar;

        return dto;
    }
}
