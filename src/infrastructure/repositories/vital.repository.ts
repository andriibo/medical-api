import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {Between, DataSource, In} from 'typeorm';
import {User, Vital} from 'domain/entities';
import {IVitalRepository} from 'app/repositories/vital.repository';
import {VitalModel} from 'infrastructure/models/vital.model';

@Injectable()
export class VitalRepository implements IVitalRepository {
    constructor(@InjectDataSource() private dataSource: DataSource) {}

    async createRange(vitals: Vital[], user: User): Promise<Vital[]> {
        const savedVitals = await this.dataSource.manager.save(
            vitals.map((vital) => ({...vital, user: user, userId: user.userId})),
        );
        return savedVitals;
    }

    async getAlreadySavedByUser(userId: string, timestamps: number[]): Promise<Vital[]> {
        return await this.dataSource.manager.findBy(VitalModel, {
            userId: userId,
            timestamp: In(timestamps),
        });
    }

    async getByUserForInterval(userId: string, startDate: Date, endDate: Date): Promise<Vital[]> {
        return await this.dataSource.manager.findBy(VitalModel, {
            userId: userId,
            timestamp: Between<number>(startDate.getTime(), endDate.getTime()), // TODO: Check behaviour devide 1000
        });
    }
}
