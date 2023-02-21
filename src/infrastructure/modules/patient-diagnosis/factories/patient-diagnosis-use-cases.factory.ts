import {Inject, Injectable} from '@nestjs/common';
import {
    CreateDiagnosisUseCase,
    DeleteDiagnosisUseCase,
    DiagnosisListUseCase,
} from 'app/modules/patient-diagnosis/use-cases';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {IPatientDiagnosisEntityMapper} from 'app/modules/patient-diagnosis/mappers/patient-diagnosis-entity.mapper';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDiagnosisSpecification} from 'app/modules/patient-diagnosis/specifications/patient-diagnosis.specification';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

@Injectable()
export class PatientDiagnosisUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IPatientDiagnosisRepository) private readonly patientDiagnosisRepository: IPatientDiagnosisRepository,
        @Inject(IPatientDiagnosisEntityMapper)
        private readonly patientDiagnosisEntityMapper: IPatientDiagnosisEntityMapper,
        @Inject(PatientDiagnosisSpecification)
        private readonly patientDiagnosisSpecification: PatientDiagnosisSpecification,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
    ) {}

    public createCreateDiagnosisUseCase(): CreateDiagnosisUseCase {
        return new CreateDiagnosisUseCase(
            this.authedUserService,
            this.patientDiagnosisRepository,
            this.patientDiagnosisEntityMapper,
            this.patientDiagnosisSpecification,
        );
    }

    public createDiagnosisListUseCase(): DiagnosisListUseCase {
        return new DiagnosisListUseCase(
            this.authedUserService,
            this.userRepository,
            this.patientDiagnosisRepository,
            this.patientDiagnosisSpecification,
            this.fileUrlService,
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
