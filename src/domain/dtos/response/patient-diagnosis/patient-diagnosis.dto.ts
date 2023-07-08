import {PatientDiagnosis} from 'domain/entities/patient-diagnosis.entity';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class PatientDiagnosisDto {
    public diagnosisId: string;

    public diagnosisName: string;

    public createdAt: string;

    public createdByUser: UserDto;

    public static fromPatientDiagnosis(patientDiagnosis: PatientDiagnosis): PatientDiagnosisDto {
        const dto = new PatientDiagnosisDto();
        dto.diagnosisId = patientDiagnosis.id;
        dto.diagnosisName = patientDiagnosis.diagnosisName;
        dto.createdAt = patientDiagnosis.createdAt;

        return dto;
    }
}
