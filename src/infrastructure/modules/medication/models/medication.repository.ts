import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IMedicationRepository} from 'app/modules/medication/repositories';
import {MedicationModel} from './medication.model';
import {Medication} from 'domain/entities';

@Injectable()
export class MedicationRepository implements IMedicationRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async get(): Promise<Medication[]> {
        return await this.dataSource.manager.find(MedicationModel);
    }
}
