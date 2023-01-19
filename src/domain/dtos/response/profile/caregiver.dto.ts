import {User} from 'domain/entities/user.entity';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class CaregiverDto extends UserDto {
    public static fromUser<T extends typeof CaregiverDto>(this: T, user: User): InstanceType<T> {
        const dto = new this() as InstanceType<T>;
        dto.userId = user.id;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.avatar = user.avatar;
        dto.deletedAt = user.deletedAt;

        return dto;
    }
}
