import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsModel} from './patient-vital-thresholds.model';
import {PatientVitalThresholds} from 'domain/entities/patient-vital-thresholds.entity';

@Injectable()
export class PatientVitalThresholdsRepository implements IPatientVitalThresholdsRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async persist(patientVitalThresholds: PatientVitalThresholdsModel): Promise<void> {
        await this.dataSource.manager.save(patientVitalThresholds);
    }

    public async getOneByPatientUserId(patientUserId: string): Promise<PatientVitalThresholds> {
        return await this.dataSource.manager.findOneBy(PatientVitalThresholdsModel, {
            patientUserId,
        });
    }
}
