import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In} from 'typeorm';
import {IDoctorMetadataRepository} from 'app/modules/profile/repositories';
import {DoctorMetadataModel} from './doctor-metadata.model';
import {DoctorMetadata} from 'domain/entities';

@Injectable()
export class DoctorMetadataRepository implements IDoctorMetadataRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async getOneById(userId: string): Promise<DoctorMetadata> {
        return await this.dataSource.manager.findOneBy(DoctorMetadataModel, {userId});
    }

    public async getByIds(ids: string[]): Promise<DoctorMetadata[]> {
        return await this.dataSource.manager.findBy(DoctorMetadataModel, {userId: In(ids)});
    }
}
