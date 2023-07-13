import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {
    PatientStatusUseCase,
    GetPatientStatusUseCase,
    DeprecatedPatientStatusAbnormalUseCase,
    DeprecatedPatientStatusNormalUseCase,
    PatientStatusNormalUseCase,
    PatientStatusBorderlineUseCase,
    PatientStatusAbnormalUseCase,
} from 'app/modules/patient-status/use-cases';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientStatusEntityMapper} from 'app/modules/patient-status/mappers/patient-status-entity.mapper';
import {PatientStatusSpecification} from 'app/modules/patient-status/specifications/patient-status.specification';

@Injectable()
export class PatientStatusUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientStatusRepository) private readonly patientStatusRepository: IPatientStatusRepository,
        @Inject(IPatientStatusEntityMapper) private readonly patientStatusMapper: IPatientStatusEntityMapper,
        @Inject(PatientStatusSpecification)
        private readonly patientStatusSpecification: PatientStatusSpecification,
    ) {}

    public createMyPatientStatusUseCase(): PatientStatusUseCase {
        return new PatientStatusUseCase(this.authedUserService, this.patientStatusRepository);
    }

    public createGetPatientStatusUseCase(): GetPatientStatusUseCase {
        return new GetPatientStatusUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusSpecification,
        );
    }

    public createMyPatientStatusNormalUseCase(): DeprecatedPatientStatusNormalUseCase {
        return new DeprecatedPatientStatusNormalUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusMapper,
        );
    }

    public createPatientStatusNormalUseCase(): PatientStatusNormalUseCase {
        return new PatientStatusNormalUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusMapper,
            this.patientStatusSpecification,
        );
    }

    public createPatientStatusBorderlineUseCase(): PatientStatusBorderlineUseCase {
        return new PatientStatusBorderlineUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusMapper,
            this.patientStatusSpecification,
        );
    }

    public createPatientStatusAbnormalUseCase(): PatientStatusAbnormalUseCase {
        return new PatientStatusAbnormalUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusMapper,
            this.patientStatusSpecification,
        );
    }

    public createMyPatientStatusAbnormalUseCase(): DeprecatedPatientStatusAbnormalUseCase {
        return new DeprecatedPatientStatusAbnormalUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusMapper,
        );
    }
}
