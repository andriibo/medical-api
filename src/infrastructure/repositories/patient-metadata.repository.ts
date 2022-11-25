import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In} from 'typeorm';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {PatientMetadataModel} from 'infrastructure/models/patient-metadata.model';
import {DoctorMetadata, PatientMetadata} from 'domain/entities';
import {DoctorMetadataModel} from "infrastructure/models";

@Injectable()
export class PatientMetadataRepository implements IPatientMetadataRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async getOneById(userId: string): Promise<PatientMetadata> {
        return await this.dataSource.manager.findOneBy(PatientMetadataModel, {userId});
    }

    public async getByIds(ids: string[]): Promise<PatientMetadata[]> {
        return await this.dataSource.manager.findBy(PatientMetadataModel, {userId: In(ids)});
    }
}
