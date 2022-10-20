import {VitalDto} from 'domain/dtos/request/vital';
import {User, Vital} from 'domain/entities';

export interface IVitalRepository {
    createRange(vitals: VitalDto[], user: User): Promise<Vital[]>;
    getAlreadySavedByUser(userId: string, timestamps: number[]): Promise<Vital[]>;
    getByUserForInterval(userId: string, startDate: Date, endDate: Date): Promise<Vital[]>;
}

export const IVitalRepository = Symbol('IVitalRepository');
