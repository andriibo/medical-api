import {UserRole, User} from 'domain/entities/user.entity';
import {CreateDoctorDto} from 'domain/dtos/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/create-patient.dto';
import {UserModel} from 'presentation/models/user.model';
import {IUserEntityMapper} from 'app/abstractions/mappers/user-entity.mapper';

export class UserModelMapper implements IUserEntityMapper {
    mapDoctorByCreateDoctorDto(dto: CreateDoctorDto): User {
        const user = new UserModel();
        user.email = dto.email;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;
        user.role = UserRole.Doctor;
        user.isActive = true;

        return user;
    }

    mapPatientByCreatePatientDto(dto: CreatePatientDto): User {
        const user = new UserModel();
        user.email = dto.email;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;
        user.role = UserRole.Patient;
        user.isActive = true;

        return user;
    }
}
