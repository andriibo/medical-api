import {UserRole, User} from 'domain/entities/user.entity';
import {CreateDoctorDto} from 'domain/dtos/request/auth/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/request/auth/create-patient.dto';
import {
    UserModel,
    DoctorMetadataModel,
    PatientMetadataModel,
    CaregiverMetadataModel,
} from 'infrastructure/modules/auth/models';
import {IUserEntityMapper} from 'app/modules/auth/mappers/user-entity.mapper';
import {IAuthModel} from 'app/modules/auth/models';
import {CreateCaregiverDto} from 'domain/dtos/request/auth/create-caregiver.dto';

export class UserModelMapper implements IUserEntityMapper {
    public mapByAuthModelAndCreateDoctorDto(authModel: IAuthModel, dto: CreateDoctorDto): User {
        const user = new UserModel();
        user.id = authModel.getUserId();
        user.email = dto.email;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;
        user.role = UserRole.Doctor;
        user.roleLabel = dto.roleLabel;

        const metadata = new DoctorMetadataModel();
        metadata.userId = authModel.getUserId();
        metadata.institution = dto.institution;
        metadata.specialty = dto.specialty;

        user.doctorMetadata = metadata;

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
        user.roleLabel = dto.roleLabel;

        const metadata = new PatientMetadataModel();
        metadata.userId = authModel.getUserId();
        metadata.dob = dto.dob;
        metadata.gender = dto.gender;
        metadata.height = dto.height;
        metadata.weight = dto.weight;

        user.patientMetadata = metadata;

        return user;
    }

    public mapByAuthModelAndCreateCaregiverDto(authModel: IAuthModel, dto: CreateCaregiverDto): User {
        const user = new UserModel();
        user.id = authModel.getUserId();
        user.email = dto.email;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;
        user.role = UserRole.Caregiver;
        user.roleLabel = dto.roleLabel;

        const metadata = new CaregiverMetadataModel();
        metadata.userId = authModel.getUserId();
        metadata.institution = dto.institution;

        user.caregiverMetadata = metadata;

        return user;
    }
}
