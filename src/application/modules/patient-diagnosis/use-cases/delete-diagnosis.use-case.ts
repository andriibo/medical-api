import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDiagnosis} from 'domain/entities';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {PatientDiagnosisSpecification} from 'app/modules/patient-diagnosis/specifications/patient-diagnosis.specification';
import {EntityNotFoundError} from 'app/errors';

export class DeleteDiagnosisUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDiagnosisRepository: IPatientDiagnosisRepository,
        private readonly patientDiagnosisSpecification: PatientDiagnosisSpecification,
    ) {}

    public async deleteDiagnosis(diagnosisId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const diagnosis = await this.getDiagnosis(diagnosisId);

        await this.patientDiagnosisSpecification.assertUserCanOperateDiagnosis(user, diagnosis.patientUserId);

        await this.patientDiagnosisRepository.delete(diagnosis);
    }

    private async getDiagnosis(diagnosisId: string): Promise<PatientDiagnosis> {
        const diagnosis = await this.patientDiagnosisRepository.getOneById(diagnosisId);

        if (diagnosis === null) {
            throw new EntityNotFoundError('Diagnosis Not Found.');
        }

        return diagnosis;
    }
}
