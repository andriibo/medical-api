import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In} from 'typeorm';
import {ICaregiverMetadataRepository} from 'app/modules/profile/repositories';
import {CaregiverMetadataModel} from './caregiver-metadata.model';
import {CaregiverMetadata} from 'domain/entities';

@Injectable()
export class CaregiverMetadataRepository implements ICaregiverMetadataRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async getOneById(userId: string): Promise<CaregiverMetadata> {
        return await this.dataSource.manager.findOneBy(CaregiverMetadataModel, {userId});
    }

    public async getByIds(ids: string[]): Promise<CaregiverMetadata[]> {
        if (!ids.length) {
            return [];
        }

        return await this.dataSource.manager.findBy(CaregiverMetadataModel, {userId: In(ids)});
    }
}
