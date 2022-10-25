import {Diagnosis} from 'domain/entities';

export class DiagnosisDto {
    public diagnosisName: string;

    public static fromDiagnosis(diagnosis: Diagnosis): DiagnosisDto {
        const dto = new DiagnosisDto();
        dto.diagnosisName = diagnosis.diagnosisName;

        return dto;
    }
}
