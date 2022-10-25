import {PatientDiagnosisDto} from 'domain/dtos/request/patient-diagnosis/patient-diagnosis.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDiagnosis, User} from 'domain/entities';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {IPatientDiagnosisEntityMapper} from 'app/modules/patient-diagnosis/mappers/patient-diagnosis-entity.mapper';
import {PatientDiagnosisSpecification} from 'app/modules/patient-diagnosis/specifications/patient-diagnosis.specification';

export class CreateDiagnosisUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDiagnosisRepository: IPatientDiagnosisRepository,
        private readonly patientDiagnosisEntityMapper: IPatientDiagnosisEntityMapper,
        private readonly patientDiagnosisSpecification: PatientDiagnosisSpecification,
    ) {}

    public async createDiagnosis(dto: PatientDiagnosisDto): Promise<void> {
        const user = await this.authedUserService.getUser();

        await this.patientDiagnosisSpecification.assertUserCanCreateDiagnosis(user, dto.patientUserId);

        const patientDiagnosis = this.createPatientDiagnosis(user, dto);

        await this.patientDiagnosisRepository.create(patientDiagnosis);
    }

    private createPatientDiagnosis(createdBy: User, dto: PatientDiagnosisDto): PatientDiagnosis {
        const patientDiagnosis = this.patientDiagnosisEntityMapper.mapByPatientDiagnosisDto(dto);
        patientDiagnosis.createdBy = createdBy.id;

        return patientDiagnosis;
    }
}
