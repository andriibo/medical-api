import {PatientCategory} from 'domain/entities/patient-category.entity';

export interface IPatientCategoryRepository {
    getByPatientUserIdAndGrantedUserId(patientUserId: string, grantedUserId: string): Promise<PatientCategory>;
}

export const IPatientCategoryRepository = Symbol('IPatientCategoryRepository');
