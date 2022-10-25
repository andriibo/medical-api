import {Diagnosis} from 'domain/entities';

export interface IDiagnosisRepository {
    get(): Promise<Diagnosis[]>;
}

export const IDiagnosisRepository = Symbol('IDiagnosisRepository');
