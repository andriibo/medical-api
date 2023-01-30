import {PatientCategory, PatientCategoryEnum} from 'domain/entities/patient-category.entity';
import {PatientCategorySpecificationError} from 'app/modules/patient-category/errors';

export class PatientCategorySpecification {
    public assertGrantedUserCanSetNormal(patientCategory: PatientCategory): void {
        if (patientCategory.category !== PatientCategoryEnum.Normal) {
            throw new PatientCategorySpecificationError('This action is not allowed.');
        }
    }

    public assertGrantedUserCanSetBorderline(patientCategory: PatientCategory): void {
        if (patientCategory.category !== PatientCategoryEnum.Abnormal) {
            throw new PatientDataAccessSpecificationError('This action is not allowed.');
        }
    }
}
