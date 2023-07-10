import {PatientDiagnosis} from 'domain/entities/patient-diagnosis.entity';

export class PatientDiagnosisDto {
    public diagnosisId: string;

    public diagnosisName: string;

    public createdAt: string;

    public createdBy: string;

    public static fromPatientDiagnosis(patientDiagnosis: PatientDiagnosis): PatientDiagnosisDto {
        const dto = new PatientDiagnosisDto();
        dto.diagnosisId = patientDiagnosis.id;
        dto.diagnosisName = patientDiagnosis.diagnosisName;
        dto.createdBy = patientDiagnosis.createdBy;
        dto.createdAt = patientDiagnosis.createdAt;

        return dto;
    }
}
