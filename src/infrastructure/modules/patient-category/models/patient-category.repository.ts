import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In} from 'typeorm';
import {PatientCategoryModel} from './patient-category.model';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientCategory, PatientCategoryEnum} from 'domain/entities/patient-category.entity';

@Injectable()
export class PatientCategoryRepository implements IPatientCategoryRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async update(entity: PatientCategoryModel | PatientCategory[]): Promise<void> {
        await this.dataSource.manager.save(entity);
    }

    public async updateCategoryAndUpdatedAtById(
        patientCategory: PatientCategoryEnum,
        patientCategoryUpdatedAt: number,
        id: string,
    ): Promise<void> {
        await this.dataSource
            .createQueryBuilder()
            .update(PatientCategoryModel)
            .set({patientCategory, patientCategoryUpdatedAt})
            .where({id})
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

    public async getNormalByPatientUserId(patientUserId: string): Promise<PatientCategory[]> {
        return await this.dataSource.manager.findBy(PatientCategoryModel, {
            patientUserId: patientUserId,
            patientCategory: PatientCategoryEnum.Normal,
        });
    }
}
