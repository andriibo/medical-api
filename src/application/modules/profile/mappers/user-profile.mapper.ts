import {User} from 'domain/entities/user.entity';
import {UpdateDoctorProfileDto, UpdatePatientProfileDto} from 'domain/dtos/request/profile';
import {DoctorMetadata, PatientMetadata, CaregiverMetadata} from 'domain/entities';
import {UpdateCaregiverProfileDto} from 'domain/dtos/request/profile/update-caregiver-profile.dto';

export interface IUserProfileMapper {
    mapByUpdateDoctorProfileDto(dto: UpdateDoctorProfileDto, user: User, metadata: DoctorMetadata): User;
    mapByUpdatePatientProfileDto(dto: UpdatePatientProfileDto, user: User, metadata: PatientMetadata): User;
    mapByUpdateCaregiverProfileDto(dto: UpdateCaregiverProfileDto, user: User, metadata: CaregiverMetadata): User;
}

export const IUserProfileMapper = Symbol('IUserProfileMapper');
