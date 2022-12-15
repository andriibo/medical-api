import {PatientDiagnosisModel} from 'infrastructure/modules/patient-diagnosis/models';
import {IPatientDiagnosisEntityMapper} from 'app/modules/patient-diagnosis/mappers/patient-diagnosis-entity.mapper';
import {PatientDiagnosis} from 'domain/entities';
import {DiagnosisDto} from 'domain/dtos/request/patient-diagnosis/diagnosis.dto';

export class PatientDiagnosisEntityMapper implements IPatientDiagnosisEntityMapper {
    public mapByDiagnosisDto(diagnosisDto: DiagnosisDto): PatientDiagnosis {
        const patientDiagnosis = new PatientDiagnosisModel();
        patientDiagnosis.patientUserId = diagnosisDto.patientUserId;
        patientDiagnosis.diagnosisName = diagnosisDto.diagnosisName;

        return patientDiagnosis;
    }
}
