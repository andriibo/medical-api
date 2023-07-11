import {PatientDiagnosis} from 'domain/entities';
import {CreateDiagnosisDto} from 'domain/dtos/request/patient-diagnosis/create-diagnosis.dto';

export interface IPatientDiagnosisEntityMapper {
    mapByCreateDiagnosisDto(diagnosisDto: CreateDiagnosisDto): PatientDiagnosis;
}

export const IPatientDiagnosisEntityMapper = Symbol('IPatientDiagnosisEntityMapper');
