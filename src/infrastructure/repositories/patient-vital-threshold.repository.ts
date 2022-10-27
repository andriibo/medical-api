import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In} from 'typeorm';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdModel} from 'infrastructure/models';
import {PatientVitalThreshold, VitalThresholdName} from 'domain/entities/patient-vital-threshold.entity';

@Injectable()
export class PatientVitalThresholdRepository implements IPatientVitalThresholdRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async update(
        patientVitalThreshold: PatientVitalThresholdModel | PatientVitalThresholdModel[],
    ): Promise<void> {
        await this.dataSource.manager.save(patientVitalThreshold);
    }

    public async getByPatientUserIdAndThresholdNames(
        patientUserId: string,
        thresholdNames: VitalThresholdName[],
    ): Promise<PatientVitalThreshold[]> {
        return await this.dataSource.manager.findBy(PatientVitalThresholdModel, {
            patientUserId,
            thresholdName: In(thresholdNames),
        });
    }
}
