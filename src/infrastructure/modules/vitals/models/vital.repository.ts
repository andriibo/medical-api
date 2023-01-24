import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {Between, DataSource, In} from 'typeorm';
import {User, Vital} from 'domain/entities';
import {IVitalRepository} from 'app/modules/vitals/repositories';
import {VitalModel} from './vital.model';

@Injectable()
export class VitalRepository implements IVitalRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async createRange(vitals: Vital[], user: User): Promise<Vital[]> {
        const vitalsModel = vitals.map((vital) => {
            const vitalModel = new VitalModel();
            vitalModel.fall = vital.fall ?? null;
            vitalModel.hr = vital.hr ?? null;
            vitalModel.rr = vital.rr ?? null;
            vitalModel.spo = vital.spo ?? null;
            vitalModel.temperature = vital.temperature ?? null;
            vitalModel.timestamp = vital.timestamp;
            vitalModel.user = user;
            vitalModel.userId = user.id;
            vitalModel.id = vital.id;

            return vitalModel;
        });

        return await this.dataSource.manager.save(vitalsModel);
    }

    public async getAlreadySavedByUser(userId: string, timestamps: number[]): Promise<Vital[]> {
        return await this.dataSource.manager.findBy(VitalModel, {
            userId: userId,
            timestamp: In(timestamps),
        });
    }

    public async getByUserForInterval(userId: string, startDate: Date, endDate: Date): Promise<Vital[]> {
        return await this.dataSource.manager.findBy(VitalModel, {
            userId: userId,
            timestamp: Between<number>(this.toTimestamp(startDate), this.toTimestamp(endDate)),
        });
    }

    public async getLastVitalsByUserIds(userIds: string[]): Promise<{user_id: string; timestamp: number}[]> {
        if (!userIds.length) {
            return [];
        }

        return await this.dataSource
            .createQueryBuilder(VitalModel, 'vital')
            .select('user_id, MAX(timestamp) as timestamp')
            .where({userId: In(userIds)})
            .groupBy('user_id')
            .getRawMany();
    }

    private toTimestamp(date: Date): number {
        return Math.round(new Date(date).getTime() / 1000);
    }
}
