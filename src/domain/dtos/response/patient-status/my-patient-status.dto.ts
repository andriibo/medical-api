import {PatientStatus} from 'domain/entities/patient-status.entity';

export class MyPatientStatusDto {
    public status: string;

    public setAt: number;

    public static fromPatientStatus(patientStatus: PatientStatus): MyPatientStatusDto {
        const dto = new MyPatientStatusDto();
        dto.status = patientStatus.status;
        dto.setAt = patientStatus.setAt;

        return dto;
    }
}
