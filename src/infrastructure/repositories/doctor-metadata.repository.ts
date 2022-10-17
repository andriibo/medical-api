import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IDoctorMetadataRepository} from 'app/repositories';
import {DoctorMetadataModel} from 'presentation/models/doctor-metadata.model';
import {DoctorMetadata} from 'domain/entities';

@Injectable()
export class DoctorMetadataRepository implements IDoctorMetadataRepository {
    constructor(@InjectDataSource() private dataSource: DataSource) {}

    async getOneByUserId(userId: string): Promise<DoctorMetadata> {
        return await this.dataSource.manager.findOneBy(DoctorMetadataModel, {userId});
    }
}
