import {PatientDiagnosisModel} from 'infrastructure/models';
import {IPatientDiagnosisEntityMapper} from 'app/modules/patient-diagnosis/mappers/patient-diagnosis-entity.mapper';
import {PatientDiagnosis} from 'domain/entities';
import {DiagnosisDto} from 'domain/dtos/request/patient-diagnosis/diagnosis.dto';

export class PatientDiagnosisEntityMapper implements IPatientDiagnosisEntityMapper {
    public mapByPatientDiagnosisDto(DiagnosisDto: DiagnosisDto): PatientDiagnosis {
        const patientDiagnosis = new PatientDiagnosisModel();
        patientDiagnosis.patientUserId = DiagnosisDto.patientUserId;
        patientDiagnosis.diagnosisName = DiagnosisDto.diagnosisName;

        return patientDiagnosis;
    }
}
