import {PatientCategory} from 'domain/entities/patient-category.entity';

export class PatientCategoryDto {
    public patientUserId: string;
    public category: string;
    public setAt: number | null;

    public static fromPatientCategory(entity: PatientCategory): PatientCategoryDto {
        const dto = new PatientCategoryDto();
        dto.patientUserId = entity.patientUserId;
        dto.category = entity.category;
        dto.setAt = entity.patientCategoryUpdatedAt;

        return dto;
    }
}
