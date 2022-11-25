import {DoctorDto} from 'domain/dtos/response/profile/doctor.dto';
import {DoctorMetadata, User} from 'domain/entities';

export class MyDoctorDto extends DoctorDto {
    public accessId: string;

    public static fromUserAndDoctorMetadata(user: User, metadata: DoctorMetadata): MyDoctorDto {
        const dto = new MyDoctorDto();
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.institution = metadata.institution;
        dto.avatar = user.avatar;

        return dto;
    }
}
