import {PatientStatus} from 'domain/entities/patient-status.entity';
import {PatientStatusEnum} from 'domain/constants/patient.const';

export class MyPatientStatusDto {
    public status: string;

    public setAt: number | null;

    public static fromPatientStatus(patientStatus: PatientStatus): MyPatientStatusDto {
        const dto = new MyPatientStatusDto();
        dto.status = patientStatus.status;
        dto.setAt = patientStatus.setAt;

        return dto;
    }

    public static getDtoWithDefaultValues(): MyPatientStatusDto {
        const dto = new MyPatientStatusDto();
        dto.status = PatientStatusEnum.Normal;
        dto.setAt = null;

        return dto;
    }
}
