import {User} from 'domain/entities/user.entity';
import {PatientStatus} from 'domain/entities/patient-status.entity';
import {PatientStatusEnum} from 'domain/constants/patient.const';

export interface IPatientStatusEntityMapper {
    mapByPatientAndStatus(patient: User, status: PatientStatusEnum): PatientStatus;
}

export const IPatientStatusEntityMapper = Symbol('IPatientStatusEntityMapper');
