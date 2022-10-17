import {User} from 'domain/entities/user.entity';
import {PatientMetadata} from 'domain/entities';

export class PatientDto {
    public email: string;

    public firstName: string;

    public lastName: string;

    public phone: string;

    public dob: Date;

    gender: string;

    height: number;

    wight: number;

    static fromUserAndPatientMetadata(user: User, metadata: PatientMetadata): PatientDto {
        const dto = new PatientDto();
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.dob = metadata.dob;
        dto.gender = metadata.gender;
        dto.height = metadata.height;
        dto.wight = metadata.wight;

        return dto;
    }
}
