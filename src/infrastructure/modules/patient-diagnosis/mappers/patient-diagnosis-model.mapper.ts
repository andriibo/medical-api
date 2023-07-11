import {PatientDiagnosisModel} from 'infrastructure/modules/patient-diagnosis/models';
import {IPatientDiagnosisEntityMapper} from 'app/modules/patient-diagnosis/mappers/patient-diagnosis-entity.mapper';
import {PatientDiagnosis} from 'domain/entities';
import {CreateDiagnosisDto} from 'domain/dtos/request/patient-diagnosis/create-diagnosis.dto';

export class PatientDiagnosisModelMapper implements IPatientDiagnosisEntityMapper {
    public mapByCreateDiagnosisDto(createDiagnosisDto: CreateDiagnosisDto): PatientDiagnosis {
        const patientDiagnosis = new PatientDiagnosisModel();
        patientDiagnosis.patientUserId = createDiagnosisDto.patientUserId;
        patientDiagnosis.diagnosisName = createDiagnosisDto.diagnosisName;

        return patientDiagnosis;
    }
}
