import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In} from 'typeorm';
import {PatientStatusModel} from './patient-status.model';
import {PatientStatus} from 'domain/entities/patient-status.entity';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {arrayUnique} from 'support/array.helper';

@Injectable()
export class PatientStatusRepository implements IPatientStatusRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async getByPatientUserId(patientUserId: string): Promise<PatientStatus> {
        const entity = await this.dataSource.manager.findOneBy(PatientStatusModel, {patientUserId});

        return entity || PatientStatusModel.getModelWithDefaultValues(patientUserId);
    }

    public async getByPatientUserIds(patientUserIds: string[]): Promise<PatientStatus[]> {
        patientUserIds = arrayUnique(patientUserIds);

        const entities = await this.dataSource.manager.findBy(PatientStatusModel, {patientUserId: In(patientUserIds)});

        const indexedEntities = {};
        entities.map((entity) => (indexedEntities[entity.patientUserId] = entity));

        patientUserIds.map((patientUserId) => {
            if (!(patientUserId in indexedEntities)) {
                indexedEntities[patientUserId] = PatientStatusModel.getModelWithDefaultValues(patientUserId);
            }
        });

        return Object.values(indexedEntities);
    }

    public async persist(entity: PatientStatusModel): Promise<PatientStatus> {
        return await this.dataSource.manager.save(entity);
    }
}
