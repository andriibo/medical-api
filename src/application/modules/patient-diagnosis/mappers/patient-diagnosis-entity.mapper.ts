import {PatientDiagnosis} from 'domain/entities';
import {PatientDiagnosisDto} from 'domain/dtos/request/patient-diagnosis/patient-diagnosis.dto';

export interface IPatientDiagnosisEntityMapper {
    mapByPatientDiagnosisDto(patientDiagnosisDto: PatientDiagnosisDto): PatientDiagnosis;
}

export const IPatientDiagnosisEntityMapper = Symbol('IPatientDiagnosisEntityMapper');
