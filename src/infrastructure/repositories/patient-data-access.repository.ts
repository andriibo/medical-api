import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IPatientDataAccessRepository} from 'app/repositories';

@Injectable()
export class PatientDataAccessRepository implements IPatientDataAccessRepository {
    constructor(@InjectDataSource() private dataSource: DataSource) {}
}
