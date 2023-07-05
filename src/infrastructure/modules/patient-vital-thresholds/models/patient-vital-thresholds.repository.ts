import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In} from 'typeorm';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsModel} from './patient-vital-thresholds.model';
import {PatientVitalThresholds} from 'domain/entities/patient-vital-thresholds.entity';
import {arrayUnique} from 'support/array.helper';

@Injectable()
export class PatientVitalThresholdsRepository implements IPatientVitalThresholdsRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async insert(patientVitalThresholds: PatientVitalThresholdsModel): Promise<void> {
        await this.dataSource.manager.insert(PatientVitalThresholdsModel, patientVitalThresholds);
    }

    public async getCurrentThresholdsByPatientUserId(patientUserId: string): Promise<PatientVitalThresholds> {
        return await this.dataSource.manager.findOne(PatientVitalThresholdsModel, {
            where: {patientUserId},
            order: {
                createdAt: 'DESC',
            },
        });
    }

    public async getByIds(ids: string[]): Promise<PatientVitalThresholds[]> {
        if (!ids.length) {
            return [];
        }

        return await this.dataSource.manager.findBy(PatientVitalThresholdsModel, {
            id: In(arrayUnique(ids)),
        });
    }
}
