import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {Between, DataSource, In} from 'typeorm';
import {Vital} from 'domain/entities';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {VitalModel} from './vital.model';
import {UserLastConnectionTime} from 'domain/entities/user-last-connection-time';

@Injectable()
export class VitalRepository implements IVitalRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async insertVitals(vitalsGroup: VitalModel[]): Promise<void> {
        await this.dataSource.manager.insert(VitalModel, vitalsGroup);
    }

    public async getByUserIdAndTimestamps(userId: string, timestamps: number[]): Promise<Vital[]> {
        return await this.dataSource.manager.findBy(VitalModel, {
            userId: userId,
            timestamp: In(timestamps),
        });
    }

    public async getByUserIdForInterval(userId: string, startDate: Date, endDate: Date): Promise<Vital[]> {
        return await this.dataSource
            .createQueryBuilder(VitalModel, 'vital')
            .select(
                'id, timestamp, user_id as "userId", thresholds_id as "thresholdsId", hr, is_hr_normal as "isHrNormal", temp, is_temp_normal as "isTempNormal", rr, is_rr_normal as "isRrNormal", spo2, is_spo2_normal as "isSpo2Normal", fall',
            )
            .where({
                userId: userId,
                timestamp: Between<number>(this.toTimestamp(startDate), this.toTimestamp(endDate)),
            })
            .orderBy('timestamp', 'DESC')
            .getRawMany();
        // return await this.dataSource.manager.find(VitalModel, {
        //     where: {
        //         userId: userId,
        //         timestamp: Between<number>(this.toTimestamp(startDate), this.toTimestamp(endDate)),
        //     },
        //     order: {timestamp: 'DESC'},
        // });
    }

    public async getLastConnectionTimeByUserIds(userIds: string[]): Promise<UserLastConnectionTime[]> {
        if (!userIds.length) {
            return [];
        }

        return await this.dataSource
            .createQueryBuilder(VitalModel, 'vital')
            .select('user_id as "userId", MAX(timestamp) as timestamp')
            .where({userId: In(userIds)})
            .groupBy('user_id')
            .getRawMany();
    }

    public async countByThresholdsId(thresholdsId: string): Promise<number> {
        return await this.dataSource.manager.countBy(VitalModel, {thresholdsId});
    }

    private toTimestamp(date: Date): number {
        return Math.round(new Date(date).getTime() / 1000);
    }
}
