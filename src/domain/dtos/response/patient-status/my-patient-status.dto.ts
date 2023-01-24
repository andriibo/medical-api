import {PatientStatus, PatientStatusEnum} from 'domain/entities/patient-status.entity';
import {currentUnixTimestamp} from 'app/support/date.helper';

export class MyPatientStatusDto {
    public status: string;

    public setAt: number;

    public static fromPatientStatus(patientStatus: PatientStatus): MyPatientStatusDto {
        const dto = new MyPatientStatusDto();
        dto.status = patientStatus.status;
        dto.setAt = patientStatus.setAt;

        return dto;
    }

    public static getDtoWithDefaultValues(): MyPatientStatusDto {
        const dto = new MyPatientStatusDto();
        dto.status = PatientStatusEnum.Normal;
        dto.setAt = currentUnixTimestamp();

        return dto;
    }
}
