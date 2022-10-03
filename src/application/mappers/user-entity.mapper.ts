import {User} from 'domain/entities/user.entity';
import {CreateDoctorDto} from 'domain/dtos/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/create-patient.dto';
import {IAuthModel} from 'app/models/auth.model';

export interface IUserEntityMapper {
    mapByAuthModelAndCreateDoctorDto(authModel: IAuthModel, dto: CreateDoctorDto): User;
    mapByAuthModelAndCreatePatientDto(authModel: IAuthModel, dto: CreatePatientDto): User;
}

export const IUserEntityMapper = Symbol('IUserEntityMapper');
