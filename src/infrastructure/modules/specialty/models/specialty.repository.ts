import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {ISpecialtyRepository} from 'app/modules/specialty/repositories';
import {SpecialtyModel} from './specialty.model';
import {Specialty} from 'domain/entities';

@Injectable()
export class SpecialtyRepository implements ISpecialtyRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async get(): Promise<Specialty[]> {
        return await this.dataSource.manager.find(SpecialtyModel, {
            order: {
                specialtyName: 'ASC',
            },
        });
    }
}
