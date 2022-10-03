import {UserRole, User} from 'domain/entities/user.entity';
import {CreateDoctorDto} from 'domain/dtos/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/create-patient.dto';
import {UserModel, DoctorMetadataModel, PatientMetadataModel} from 'presentation/models';
import {IUserEntityMapper} from 'app/mappers/user-entity.mapper';
import {IAuthModel} from 'app/models/auth.model';

export class UserModelMapper implements IUserEntityMapper {
    mapByAuthModelAndCreateDoctorDto(authModel: IAuthModel, dto: CreateDoctorDto): User {
        const user = new UserModel();
        user.userId = authModel.getUserId();
        user.email = dto.email;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;
        user.role = UserRole.Doctor;
        user.isActive = true;

        const metadata = new DoctorMetadataModel();
        metadata.userId = authModel.getUserId();
        metadata.institution = dto.institution;

        user.metadata = metadata;

        return user;
    }

    mapByAuthModelAndCreatePatientDto(authModel: IAuthModel, dto: CreatePatientDto): User {
        const user = new UserModel();
        user.userId = authModel.getUserId();
        user.email = dto.email;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;
        user.role = UserRole.Patient;
        user.isActive = true;

        const metadata = new PatientMetadataModel();
        metadata.userId = authModel.getUserId();
        metadata.dob = dto.dob;
        metadata.gender = dto.gender;
        metadata.height = dto.height;
        metadata.wight = dto.wight;

        user.metadata = metadata;

        return user;
    }
}
