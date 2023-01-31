import {PatientCategory} from 'domain/entities/patient-category.entity';

export interface IPatientCategoryRepository {
    update(patientCategory: PatientCategory): Promise<void>;

    getOneByPatientUserIdAndGrantedUserId(patientUserId: string, grantedUserId: string): Promise<PatientCategory>;

    getByPatientUserIdsAndGrantedUserId(patientUserIds: string[], grantedUserId: string): Promise<PatientCategory[]>;
}

export const IPatientCategoryRepository = Symbol('IPatientCategoryRepository');
