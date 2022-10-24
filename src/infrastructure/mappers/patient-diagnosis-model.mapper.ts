import {PatientDiagnosisModel} from 'infrastructure/models';
import {IPatientDiagnosisEntityMapper} from 'app/modules/patient-diagnosis/mappers/patient-diagnosis-entity.mapper';
import {PatientDiagnosis} from 'domain/entities';
import {PatientDiagnosisDto} from 'domain/dtos/request/patient-diagnosis/patient-diagnosis.dto';

export class PatientDiagnosisEntityMapper implements IPatientDiagnosisEntityMapper {
    public mapByPatientDiagnosisDto(patientDiagnosisDto: PatientDiagnosisDto): PatientDiagnosis {
        const patientDiagnosis = new PatientDiagnosisModel();
        patientDiagnosis.patientUserId = patientDiagnosisDto.patientUserId;
        patientDiagnosis.diagnosisName = patientDiagnosisDto.diagnosisName;

        return patientDiagnosis;
    }
}
