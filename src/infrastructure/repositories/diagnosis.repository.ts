import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IDiagnosisRepository} from 'app/modules/diagnosis/repositories';
import {DiagnosisModel} from 'infrastructure/models';
import {Diagnosis} from 'domain/entities/diagnosis.entity';

@Injectable()
export class DiagnosisRepository implements IDiagnosisRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async get(): Promise<Diagnosis[]> {
        return await this.dataSource.manager.find(DiagnosisModel);
    }
}
