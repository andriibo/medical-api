import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In} from 'typeorm';
import {PatientCategoryModel} from './patient-category.model';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientCategory, PatientCategoryEnum} from 'domain/entities/patient-category.entity';

@Injectable()
export class PatientCategoryRepository implements IPatientCategoryRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async update(patientCategory: PatientCategoryModel): Promise<void> {
        await this.dataSource.manager.save(patientCategory);
    }

    public async updateNormalByPatientUserId(
        patientUserId: string,
        patientCategory: PatientCategoryEnum,
        patientCategoryUpdatedAt: number,
    ): Promise<void> {
        await this.dataSource
            .createQueryBuilder()
            .update(PatientCategoryModel)
            .set({patientCategory, patientCategoryUpdatedAt: patientCategoryUpdatedAt})
            .where({patientUserId, patientCategory: PatientCategoryEnum.Normal})
            .execute();
    }

    public async getOneByPatientUserIdAndGrantedUserId(
        patientUserId: string,
        grantedUserId: string,
    ): Promise<PatientCategory> {
        return await this.dataSource.manager.findOneBy(PatientCategoryModel, {patientUserId, grantedUserId});
    }

    public async getByPatientUserIdsAndGrantedUserId(
        patientUserIds: string[],
        grantedUserId: string,
    ): Promise<PatientCategory[]> {
        if (!patientUserIds.length) {
            return [];
        }
        return await this.dataSource.manager.findBy(PatientCategoryModel, {
            patientUserId: In(patientUserIds),
            grantedUserId,
        });
    }
}
