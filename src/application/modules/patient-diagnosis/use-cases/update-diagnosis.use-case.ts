import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDiagnosis} from 'domain/entities';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {IPatientDiagnosisEntityMapper} from 'app/modules/patient-diagnosis/mappers/patient-diagnosis-entity.mapper';
import {PatientDiagnosisSpecification} from 'app/modules/patient-diagnosis/specifications/patient-diagnosis.specification';
import {UpdateDiagnosisDto} from 'domain/dtos/request/patient-diagnosis/update-diagnosis.dto';
import {EntityNotFoundError} from 'app/errors';

export class UpdateDiagnosisUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDiagnosisRepository: IPatientDiagnosisRepository,
        private readonly patientDiagnosisEntityMapper: IPatientDiagnosisEntityMapper,
        private readonly patientDiagnosisSpecification: PatientDiagnosisSpecification,
    ) {}

    public async updateDiagnosis(diagnosisId: string, dto: UpdateDiagnosisDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const diagnosis = await this.getDiagnosis(diagnosisId);

        await this.patientDiagnosisSpecification.assertUserCanOperateDiagnosis(user, diagnosis.patientUserId);

        diagnosis.diagnosisName = dto.diagnosisName;

        await this.patientDiagnosisRepository.update(diagnosis);
    }

    private async getDiagnosis(diagnosisId: string): Promise<PatientDiagnosis> {
        const diagnosis = await this.patientDiagnosisRepository.getOneById(diagnosisId);

        if (diagnosis === null) {
            throw new EntityNotFoundError('Diagnosis Not Found.');
        }

        return diagnosis;
    }
}
