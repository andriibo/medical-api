import {User} from 'domain/entities/user.entity';
import {PatientStatus, PatientStatusEnum} from 'domain/entities/patient-status.entity';

export interface IPatientStatusEntityMapper {
    mapByPatientAndStatus(patient: User, status: PatientStatusEnum): PatientStatus;
}

export const IPatientStatusEntityMapper = Symbol('IPatientStatusEntityMapper');
