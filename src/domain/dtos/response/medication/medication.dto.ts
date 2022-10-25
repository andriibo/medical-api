import {Medication} from 'domain/entities';

export class MedicationDto {
    public genericName: string;

    public brandNames: string;

    public static fromMedication(medication: Medication): MedicationDto {
        const dto = new MedicationDto();
        dto.genericName = medication.genericName;
        dto.brandNames = medication.brandNames;

        return dto;
    }
}
