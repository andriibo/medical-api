import {Specialty} from 'domain/entities';

export interface ISpecialtyRepository {
    get(): Promise<Specialty[]>;
}

export const ISpecialtyRepository = Symbol('ISpecialtyRepository');
