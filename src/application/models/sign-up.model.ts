import {CreateDoctorDto} from 'domain/dtos/request/auth/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/request/auth/create-patient.dto';
import {UserRole} from 'domain/entities/user.entity';

export class SignUpModel {
    private constructor(
        public readonly userName: string,
        public readonly role: string,
        public readonly password: string,
    ) {}

    static fromCreateDoctorDto(dto: CreateDoctorDto): SignUpModel {
        return new SignUpModel(dto.email, UserRole.Doctor, dto.password);
    }

    static fromCreatePatientDto(dto: CreatePatientDto): SignUpModel {
        return new SignUpModel(dto.email, UserRole.Patient, dto.password);
    }
}
