import {User} from 'domain/entities/user.entity';
import {CreateDoctorDto} from 'domain/dtos/request/auth/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/request/auth/create-patient.dto';
import {IAuthModel} from 'app/modules/auth/models';

export interface IUserEntityMapper {
    mapByAuthModelAndCreateDoctorDto(authModel: IAuthModel, dto: CreateDoctorDto): User;
    mapByAuthModelAndCreatePatientDto(authModel: IAuthModel, dto: CreatePatientDto): User;
}

export const IUserEntityMapper = Symbol('IUserEntityMapper');
