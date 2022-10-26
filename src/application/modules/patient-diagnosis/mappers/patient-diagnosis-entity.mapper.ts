import {PatientDiagnosis} from 'domain/entities';
import {DiagnosisDto} from 'domain/dtos/request/patient-diagnosis/diagnosis.dto';

export interface IPatientDiagnosisEntityMapper {
    mapByDiagnosisDto(diagnosisDto: DiagnosisDto): PatientDiagnosis;
}

export const IPatientDiagnosisEntityMapper = Symbol('IPatientDiagnosisEntityMapper');
