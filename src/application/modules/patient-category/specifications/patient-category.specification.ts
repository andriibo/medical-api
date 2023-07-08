import {PatientCategory} from 'domain/entities/patient-category.entity';
import {PatientCategorySpecificationError} from 'app/modules/patient-category/errors';
import {PatientCategoryEnum} from 'domain/constants/patient.const';

export class PatientCategorySpecification {
    public assertGrantedUserCanSetNormal(patientCategory: PatientCategory): void {
        if (patientCategory.patientCategory === PatientCategoryEnum.Normal) {
            throw new PatientCategorySpecificationError('This action is not allowed.');
        }
    }

    public assertGrantedUserCanSetBorderline(patientCategory: PatientCategory): void {
        if (patientCategory.patientCategory !== PatientCategoryEnum.Abnormal) {
            throw new PatientCategorySpecificationError('This action is not allowed.');
        }
    }
}
