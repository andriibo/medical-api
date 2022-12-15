import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdModel} from './patient-vital-threshold.model';
import {PatientVitalThreshold} from 'domain/entities/patient-vital-threshold.entity';

@Injectable()
export class PatientVitalThresholdRepository implements IPatientVitalThresholdRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async persist(
        patientVitalThreshold: PatientVitalThresholdModel | PatientVitalThresholdModel[],
    ): Promise<void> {
        await this.dataSource.manager.save(patientVitalThreshold);
    }

    public async getByPatientUserId(patientUserId: string): Promise<PatientVitalThreshold[]> {
        return await this.dataSource.manager.findBy(PatientVitalThresholdModel, {
            patientUserId,
        });
    }
}
