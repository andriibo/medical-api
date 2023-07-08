import {User} from 'domain/entities/user.entity';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {UpdateDoctorProfileDto, UpdatePatientProfileDto} from 'domain/dtos/request/profile';
import {DoctorMetadata, PatientMetadata, CaregiverMetadata} from 'domain/entities';
import {UpdateCaregiverProfileDto} from 'domain/dtos/request/profile/update-caregiver-profile.dto';

export class UserProfileMapper implements IUserProfileMapper {
    public mapByUpdateDoctorProfileDto(dto: UpdateDoctorProfileDto, user: User, metadata: DoctorMetadata): User {
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;

        metadata.institution = dto.institution;

        user.doctorMetadata = metadata;

        return user;
    }

    public mapByUpdatePatientProfileDto(dto: UpdatePatientProfileDto, user: User, metadata: PatientMetadata): User {
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;

        metadata.dob = dto.dob;
        metadata.gender = dto.gender;
        metadata.height = dto.height;
        metadata.weight = dto.weight;

        user.patientMetadata = metadata;

        return user;
    }

    public mapByUpdateCaregiverProfileDto(
        dto: UpdateCaregiverProfileDto,
        user: User,
        metadata: CaregiverMetadata,
    ): User {
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.phone = dto.phone;

        metadata.institution = dto.institution;

        user.caregiverMetadata = metadata;

        return user;
    }
}
