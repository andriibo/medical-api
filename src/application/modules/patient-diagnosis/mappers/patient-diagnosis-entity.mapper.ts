import {PatientDiagnosis} from 'domain/entities';
import {DiagnosisDto} from 'domain/dtos/request/patient-diagnosis/diagnosis.dto';

export interface IPatientDiagnosisEntityMapper {
    mapByPatientDiagnosisDto(DiagnosisDto: DiagnosisDto): PatientDiagnosis;
}

export const IPatientDiagnosisEntityMapper = Symbol('IPatientDiagnosisEntityMapper');
