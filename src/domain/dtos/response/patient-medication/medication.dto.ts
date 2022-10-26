import {PatientMedication} from 'domain/entities/patient-medication.entity';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class MedicationDto {
    public medicationId: string;

    public genericName: string;

    public brandNames: string[];

    public createdAt: string;

    public createdByUser: UserDto;

    public static fromPatientMedication(patientMedication: PatientMedication): MedicationDto {
        const dto = new MedicationDto();
        dto.medicationId = patientMedication.id;
        dto.genericName = patientMedication.genericName;
        dto.brandNames = patientMedication.brandNames;
        dto.createdAt = patientMedication.createdAt;

        return dto;
    }
}
