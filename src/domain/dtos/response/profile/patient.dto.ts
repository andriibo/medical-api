import {User} from 'domain/entities/user.entity';
import {PatientMetadata} from 'domain/entities';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class PatientDto extends UserDto {
    public dob: Date;

    public gender: string;

    public height: number;

    public weight: number;

    public static fromUserAndPatientMetadata<T extends typeof PatientDto>(
        this: T,
        user: User,
        metadata: PatientMetadata,
    ): InstanceType<T> {
        const dto = new this() as InstanceType<T>;
        dto.userId = user.id;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.dob = metadata.dob;
        dto.gender = metadata.gender;
        dto.height = metadata.height;
        dto.weight = metadata.weight;
        dto.avatar = user.avatar;

        return dto;
    }
}
