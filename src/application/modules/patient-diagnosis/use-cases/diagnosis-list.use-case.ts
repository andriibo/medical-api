import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {PatientDiagnosisSpecification} from 'app/modules/patient-diagnosis/specifications/patient-diagnosis.specification';
import {PatientDiagnosisDto} from 'domain/dtos/response/patient-diagnosis/patient-diagnosis.dto';

export class DiagnosisListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDiagnosisRepository: IPatientDiagnosisRepository,
        private readonly patientDiagnosisSpecification: PatientDiagnosisSpecification,
    ) {}

    public async getList(patientUserId: string): Promise<PatientDiagnosisDto[]> {
        const user = await this.authedUserService.getUser();

        await this.patientDiagnosisSpecification.assertUserCanOperateDiagnosis(user, patientUserId);

        const items = await this.patientDiagnosisRepository.getByPatientUserId(patientUserId);

        return items.map((item) => PatientDiagnosisDto.fromPatientDiagnosis(item));
    }
}
