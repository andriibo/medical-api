import {Diagnosis} from 'domain/entities/diagnosis.entity';

export interface IDiagnosisRepository {
    get(): Promise<Diagnosis[]>;
}

export const IDiagnosisRepository = Symbol('IDiagnosisRepository');
