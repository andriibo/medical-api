import {Vital} from 'domain/entities';
import {UserLastConnectionTime} from 'domain/entities/user-last-connection-time';

export interface IVitalRepository {
    insertVitals(vitals: Vital[]): Promise<void>;
    getByUserIdAndTimestamps(userId: string, timestamps: number[]): Promise<Vital[]>;
    getByUserIdForInterval(userId: string, startDate: Date, endDate: Date): Promise<Vital[]>;
    getLastConnectionTimeByUserIds(userIds: string[]): Promise<UserLastConnectionTime[]>;
    countByThresholdsId(thresholdsId: string): Promise<number>;
}

export const IVitalRepository = Symbol('IVitalRepository');
