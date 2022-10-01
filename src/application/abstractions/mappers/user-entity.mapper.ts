import {User} from 'domain/entities/user.entity';
import {CreateDoctorDto} from 'domain/dtos/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/create-patient.dto';

export interface IUserEntityMapper {
    mapDoctorByCreateDoctorDto(dto: CreateDoctorDto): User;
    mapPatientByCreatePatientDto(dto: CreatePatientDto): User;
}

export const IUserEntityMapper = Symbol('IUserEntityMapper');
