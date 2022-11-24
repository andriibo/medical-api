import {User} from 'domain/entities/user.entity';
import {PatientDataAccess} from 'domain/entities';

export class MyDoctorDto {
    public accessId: string;

    public email: string;

    public firstName: string;

    public lastName: string;

    public phone: string;

    public avatar: string;

    public static fromUserAndPatientDataAccess(user: User, dataAccess: PatientDataAccess): MyDoctorDto {
        const dto = new MyDoctorDto();
        dto.accessId = dataAccess.id;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.avatar = user.avatar;

        return dto;
    }
}
