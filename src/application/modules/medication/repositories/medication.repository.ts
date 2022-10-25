import {Medication} from 'domain/entities';

export interface IMedicationRepository {
    get(): Promise<Medication[]>;
}

export const IMedicationRepository = Symbol('IMedicationRepository');
