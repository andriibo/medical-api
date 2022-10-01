import {UserRole, User} from 'domain/entities/user.entity';
import {CreateDoctorDto} from 'domain/dtos/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/create-patient.dto';

export class UserEntityFactory {
    createDoctorByCreateDoctorDto(dto: CreateDoctorDto): User {
        const user = new User();
        user.email = dto.email;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;
        user.role = UserRole.Doctor;
        user.isActive = true;

        return user;
    }

    createPatientByCreatePatientDto(dto: CreatePatientDto): User {
        const user = new User();
        user.email = dto.email;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;
        user.role = UserRole.Patient;
        user.isActive = true;

        return user;
    }
}
