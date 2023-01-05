import {User} from 'domain/entities/user.entity';
import {DoctorMetadata} from 'domain/entities';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class DoctorDto extends UserDto {
    public institution: string;

    public static fromUserAndDoctorMetadata<T extends typeof DoctorDto>(
        this: T,
        user: User,
        metadata: DoctorMetadata,
    ): InstanceType<T> {
        const dto = new this() as InstanceType<T>;
        dto.userId = user.id;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.institution = metadata.institution;
        dto.avatar = user.avatar;

        return dto;
    }
}
