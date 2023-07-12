import {PatientStatusEnum} from 'domain/constants/patient.const';

export interface PatientStatus {
    patientUserId: string;

    status: PatientStatusEnum;

    setBy: string;

    setAt: number;
}
