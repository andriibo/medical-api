import {UserRole, User} from 'domain/entities/user.entity';
import {CreateDoctorDto} from 'domain/dtos/request/auth/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/request/auth/create-patient.dto';
import {UserModel, DoctorMetadataModel, PatientMetadataModel} from 'infrastructure/models';
import {IUserEntityMapper} from 'app/modules/auth/mappers/user-entity.mapper';
import {IAuthModel} from 'app/modules/auth/models';

export class UserModelMapper implements IUserEntityMapper {
    public mapByAuthModelAndCreateDoctorDto(authModel: IAuthModel, dto: CreateDoctorDto): User {
        const user = new UserModel();
        user.id = authModel.getUserId();
        user.email = dto.email;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;
        user.role = UserRole.Doctor;

        const metadata = new DoctorMetadataModel();
        metadata.userId = authModel.getUserId();
        metadata.institution = dto.institution;

        user.metadata = metadata;

        return user;
    }

    public mapByAuthModelAndCreatePatientDto(authModel: IAuthModel, dto: CreatePatientDto): User {
        const user = new UserModel();
        user.id = authModel.getUserId();
        user.email = dto.email;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;
        user.role = UserRole.Patient;

        const metadata = new PatientMetadataModel();
        metadata.userId = authModel.getUserId();
        metadata.dob = dto.dob;
        metadata.gender = dto.gender;
        metadata.height = dto.height;
        metadata.weight = dto.weight;

        user.metadata = metadata;

        return user;
    }
}
