import {PatientDataAccess} from 'domain/entities';

export interface IPatientDataAccessEventEmitter {
    emitAccessForUnregisteredUserInitiated(patientDataAccess: PatientDataAccess): void;
}

export const IPatientDataAccessEventEmitter = Symbol('IPatientDataAccessEventEmitter');
