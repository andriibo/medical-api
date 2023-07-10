import {Inject, Injectable} from '@nestjs/common';
import {
    CreateDiagnosisUseCase,
    DeleteDiagnosisUseCase,
    DiagnosisListUseCase,
    UpdateDiagnosisUseCase,
} from 'app/modules/patient-diagnosis/use-cases';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {IPatientDiagnosisEntityMapper} from 'app/modules/patient-diagnosis/mappers/patient-diagnosis-entity.mapper';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDiagnosisSpecification} from 'app/modules/patient-diagnosis/specifications/patient-diagnosis.specification';

@Injectable()
export class PatientDiagnosisUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientDiagnosisRepository) private readonly patientDiagnosisRepository: IPatientDiagnosisRepository,
        @Inject(IPatientDiagnosisEntityMapper)
        private readonly patientDiagnosisEntityMapper: IPatientDiagnosisEntityMapper,
        @Inject(PatientDiagnosisSpecification)
        private readonly patientDiagnosisSpecification: PatientDiagnosisSpecification,
    ) {}

    public createCreateDiagnosisUseCase(): CreateDiagnosisUseCase {
        return new CreateDiagnosisUseCase(
            this.authedUserService,
            this.patientDiagnosisRepository,
            this.patientDiagnosisEntityMapper,
            this.patientDiagnosisSpecification,
        );
    }

    public updateCreateDiagnosisUseCase(): UpdateDiagnosisUseCase {
        return new UpdateDiagnosisUseCase(
            this.authedUserService,
            this.patientDiagnosisRepository,
            this.patientDiagnosisEntityMapper,
            this.patientDiagnosisSpecification,
        );
    }

    public createDiagnosisListUseCase(): DiagnosisListUseCase {
        return new DiagnosisListUseCase(
            this.authedUserService,
            this.patientDiagnosisRepository,
            this.patientDiagnosisSpecification,
        );
    }

    public createDeleteDiagnosisUseCase(): DeleteDiagnosisUseCase {
        return new DeleteDiagnosisUseCase(
            this.authedUserService,
            this.patientDiagnosisRepository,
            this.patientDiagnosisSpecification,
        );
    }
}
