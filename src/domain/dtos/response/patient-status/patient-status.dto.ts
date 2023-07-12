import {PatientStatus} from 'domain/entities/patient-status.entity';
import {PatientStatusEnum} from 'domain/constants/patient.const';

export class PatientStatusDto {
    public status: string;

    public setAt: number | null;

    public static fromPatientStatus(patientStatus: PatientStatus): PatientStatusDto {
        const dto = new PatientStatusDto();
        dto.status = patientStatus.status;
        dto.setAt = patientStatus.setAt;

        return dto;
    }

    public static getDtoWithDefaultValues(): PatientStatusDto {
        const dto = new PatientStatusDto();
        dto.status = PatientStatusEnum.Normal;
        dto.setAt = null;

        return dto;
    }
}
