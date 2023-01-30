import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {PatientCategoryModel} from './patient-category.model';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientCategory} from 'domain/entities/patient-category.entity';

@Injectable()
export class PatientCategoryRepository implements IPatientCategoryRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async update(patientCategory: PatientCategoryModel): Promise<void> {
        await this.dataSource.manager.save(patientCategory);
    }

    public async getByPatientUserIdAndGrantedUserId(
        patientUserId: string,
        grantedUserId: string,
    ): Promise<PatientCategory> {
        return await this.dataSource.manager.findOneBy(PatientCategoryModel, {patientUserId, grantedUserId});
    }
}
