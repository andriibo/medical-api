import {VitalDto} from 'domain/dtos/request/vital';
import {User, Vital} from 'domain/entities';
import {UserLastConnectionTime} from 'domain/entities/user-last-connection-time';

export interface IVitalRepository {
    createRange(vitals: VitalDto[], user: User): Promise<Vital[]>;
    getAlreadySavedByUser(userId: string, timestamps: number[]): Promise<Vital[]>;
    getByUserForInterval(userId: string, startDate: Date, endDate: Date): Promise<Vital[]>;
    getLastConnectionTimeByUserIds(userIds: string[]): Promise<UserLastConnectionTime[]>;
}

export const IVitalRepository = Symbol('IVitalRepository');
