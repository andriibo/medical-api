import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IPatientMetadataRepository} from 'app/repositories';
import {PatientMetadataModel} from 'infrastructure/models/patient-metadata.model';
import {PatientMetadata} from 'domain/entities';

@Injectable()
export class PatientMetadataRepository implements IPatientMetadataRepository {
    constructor(@InjectDataSource() private dataSource: DataSource) {}

    async getOneByUserId(userId: string): Promise<PatientMetadata> {
        return await this.dataSource.manager.findOneBy(PatientMetadataModel, {userId});
    }
}
