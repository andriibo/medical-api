import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {MyDoctorDto} from 'domain/dtos/response/profile/my-doctor.dto';

export interface ISortUsersService {
    byName(users: MyPatientDto[] | MyDoctorDto[]): MyPatientDto[] | MyDoctorDto[];
}

export const ISortUsersService = Symbol('ISortUsersService');
