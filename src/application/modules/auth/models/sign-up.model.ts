import {CreateDoctorDto} from 'domain/dtos/request/auth/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/request/auth/create-patient.dto';
import {UserRoleEnum} from 'domain/constants/user.const';
import {CreateCaregiverDto} from 'domain/dtos/request/auth/create-caregiver.dto';

export class SignUpModel {
    private constructor(
        public readonly email: string,
        public readonly role: string,
        public readonly password: string,
    ) {}

    public static fromCreateDoctorDto(dto: CreateDoctorDto): SignUpModel {
        return new SignUpModel(dto.email, UserRoleEnum.Doctor, dto.password);
    }

    public static fromCreatePatientDto(dto: CreatePatientDto): SignUpModel {
        return new SignUpModel(dto.email, UserRoleEnum.Patient, dto.password);
    }

    public static fromCreateCaregiverDto(dto: CreateCaregiverDto): SignUpModel {
        return new SignUpModel(dto.email, UserRoleEnum.Caregiver, dto.password);
    }
}
