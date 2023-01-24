import {VitalDto} from 'domain/dtos/request/vital';
import {User, Vital} from 'domain/entities';
import {VitalUserLastConnectedModel} from 'app/modules/vitals/models/vital-user-last-connected.model';

export interface IVitalRepository {
    createRange(vitals: VitalDto[], user: User): Promise<Vital[]>;
    getAlreadySavedByUser(userId: string, timestamps: number[]): Promise<Vital[]>;
    getByUserForInterval(userId: string, startDate: Date, endDate: Date): Promise<Vital[]>;
    getLastVitalsByUserIds(userIds: string[]): Promise<VitalUserLastConnectedModel[]>;
}

export const IVitalRepository = Symbol('IVitalRepository');
