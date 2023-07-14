import {PatientMedication} from 'domain/entities/patient-medication.entity';

export class MedicationDto {
    public medicationId: string;

    public genericName: string;

    public brandNames: string[];

    public dose: number | null;

    public timesPerDay: string | null;

    public createdBy: string;

    public createdAt: string;

    public static fromPatientMedication(patientMedication: PatientMedication): MedicationDto {
        const dto = new MedicationDto();
        dto.medicationId = patientMedication.id;
        dto.genericName = patientMedication.genericName;
        dto.brandNames = patientMedication.brandNames;
        dto.dose = patientMedication.dose;
        dto.timesPerDay = patientMedication.timesPerDay;
        dto.createdBy = patientMedication.createdBy;
        dto.createdAt = patientMedication.createdAt;

        return dto;
    }
}
