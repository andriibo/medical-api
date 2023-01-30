import {PatientCategory} from 'domain/entities/patient-category.entity';

export interface IPatientCategoryRepository {
    update(patientCategory: PatientCategory): Promise<void>;

    getByPatientUserIdAndGrantedUserId(patientUserId: string, grantedUserId: string): Promise<PatientCategory>;
}

export const IPatientCategoryRepository = Symbol('IPatientCategoryRepository');
