import {PatientDataAccessSpecificationError} from 'app/modules/patient-data-access/errors';
import {PatientCategory, PatientCategoryEnum} from 'domain/entities/patient-category.entity';

export class PatientCategorySpecification {
    public assertGrantedUserCanSetNormal(patientCategory: PatientCategory): void {
        if (patientCategory.category !== PatientCategoryEnum.Normal) {
            throw new PatientDataAccessSpecificationError('This action is not allowed.');
        }
    }
}
