import {User} from 'domain/entities/user.entity';
import {UpdateDoctorProfileDto, UpdatePatientProfileDto} from 'domain/dtos/request/profile';
import {DoctorMetadata, PatientMetadata} from 'domain/entities';

export interface IUserProfileMapper {
    mapByUpdateDoctorProfileDto(dto: UpdateDoctorProfileDto, user: User, metadata: DoctorMetadata): User;
    mapByUpdatePatientProfileDto(dto: UpdatePatientProfileDto, user: User, metadata: PatientMetadata): User;
}

export const IUserProfileMapper = Symbol('IUserProfileMapper');
