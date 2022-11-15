import {User} from 'domain/entities/user.entity';
import {DoctorMetadata} from 'domain/entities';

export class DoctorDto {
    public email: string;

    public firstName: string;

    public lastName: string;

    public phone: string;

    public institution: string;

    public avatar: string;

    public static fromUserAndDoctorMetadata(user: User, metadata: DoctorMetadata): DoctorDto {
        const dto = new DoctorDto();
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.institution = metadata.institution;
        dto.avatar = user.avatar;

        return dto;
    }
}
