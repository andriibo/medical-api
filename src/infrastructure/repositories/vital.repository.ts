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
        const vitalsModel = vitals.map((vital) => {
            const vitalModel = new VitalModel();
            vitalModel.fall = vital.fall;
            vitalModel.hr = vital.hr;
            vitalModel.rr = vital.rr;
            vitalModel.spo = vital.spo;
            vitalModel.temperature = vital.temperature;
            vitalModel.timestamp = vital.timestamp;
            vitalModel.user = user;
            vitalModel.userId = user.userId;
            vitalModel.vitalId = vital.vitalId;
            return vitalModel;
        });
        const savedVitals = await this.dataSource.manager.save(vitalsModel);
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
            timestamp: Between<number>(new Date(startDate).getTime(), new Date(endDate).getTime()), // TODO: Check behaviour devide 1000
        });
    }
}
