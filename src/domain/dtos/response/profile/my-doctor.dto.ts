import {User} from 'domain/entities/user.entity';
import {DoctorMetadata, PatientDataAccess} from 'domain/entities';

export class MyDoctorDto {
    public accessId: string;

    public email: string;

    public firstName: string;

    public lastName: string;

    public phone: string;
    public institution: string;

    public avatar: string;

    public static fromUserAndPatientDataAccess(
        user: User,
        metadata: DoctorMetadata,
        dataAccess: PatientDataAccess,
    ): MyDoctorDto {
        const dto = new MyDoctorDto();
        dto.accessId = dataAccess.id;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.institution = metadata.institution;
        dto.avatar = user.avatar;

        return dto;
    }
}
