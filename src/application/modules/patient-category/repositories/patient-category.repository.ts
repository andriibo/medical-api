import {PatientCategory, PatientCategoryEnum} from 'domain/entities/patient-category.entity';

export interface IPatientCategoryRepository {
    update(data: PatientCategory | PatientCategory[]): Promise<void>;

    updateNormalByPatientUserId(
        patientUserId: string,
        patientCategory: PatientCategoryEnum,
        patientCategoryUpdatedAt: number,
    ): Promise<void>;

    getOneByPatientUserIdAndGrantedUserId(patientUserId: string, grantedUserId: string): Promise<PatientCategory>;

    getByPatientUserIdsAndGrantedUserId(patientUserIds: string[], grantedUserId: string): Promise<PatientCategory[]>;

    getNormalByPatientUserId(patientUserId: string): Promise<PatientCategory[]>;
}

export const IPatientCategoryRepository = Symbol('IPatientCategoryRepository');
