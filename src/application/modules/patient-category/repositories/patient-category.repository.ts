import {PatientCategory} from 'domain/entities/patient-category.entity';

export interface IPatientCategoryRepository {
    getByPatientUserId(patientUserId: string): Promise<PatientCategory>;
}

export const IPatientCategoryRepository = Symbol('IPatientCategoryRepository');
