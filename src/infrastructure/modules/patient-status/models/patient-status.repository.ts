import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {PatientStatusModel} from './patient-status.model';
import {PatientStatus} from 'domain/entities/patient-status.entity';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {currentUnixTimestamp} from 'app/support/date.helper';

@Injectable()
export class PatientStatusRepository implements IPatientStatusRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async getByPatientUserId(patientUserId: string): Promise<PatientStatus> {
        let entity = await this.dataSource.manager.findOneBy(PatientStatusModel, {patientUserId});
        if (entity === null) {
            entity = PatientStatusModel.getModelWithDefaultValues();
            entity.patientUserId = patientUserId;
            entity.setAt = currentUnixTimestamp();
        }

        return entity;
    }

    public async persist(entity: PatientStatusModel): Promise<PatientStatus> {
        return await this.dataSource.manager.save(entity);
    }
}
