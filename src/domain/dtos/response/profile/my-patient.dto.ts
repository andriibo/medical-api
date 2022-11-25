import {User} from 'domain/entities/user.entity';
import {PatientMetadata, PatientDataAccess} from 'domain/entities';

export class MyPatientDto {
    public accessId: string;

    public email: string;

    public firstName: string;

    public lastName: string;

    public phone: string;

    public dob: Date;

    public gender: string;

    public height: number;

    public weight: number;

    public avatar: string;

    public static fromUserAndPatientMetadataAndPatientDataAccess(
        user: User,
        metadata: PatientMetadata,
        dataAccess: PatientDataAccess,
    ): MyPatientDto {
        const dto = new MyPatientDto();
        dto.accessId = dataAccess.id;
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
