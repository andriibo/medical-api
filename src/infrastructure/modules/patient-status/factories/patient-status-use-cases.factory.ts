import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {
    GetPatientStatusUseCase,
    PatientStatusNormalUseCase,
    PatientStatusBorderlineUseCase,
    PatientStatusAbnormalUseCase,
} from 'app/modules/patient-status/use-cases';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {PatientStatusSpecification} from 'app/modules/patient-status/specifications/patient-status.specification';

@Injectable()
export class PatientStatusUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientStatusRepository) private readonly patientStatusRepository: IPatientStatusRepository,
        @Inject(PatientStatusSpecification)
        private readonly patientStatusSpecification: PatientStatusSpecification,
    ) {}

    public createGetPatientStatusUseCase(): GetPatientStatusUseCase {
        return new GetPatientStatusUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusSpecification,
        );
    }

    public createPatientStatusNormalUseCase(): PatientStatusNormalUseCase {
        return new PatientStatusNormalUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusSpecification,
        );
    }

    public createPatientStatusBorderlineUseCase(): PatientStatusBorderlineUseCase {
        return new PatientStatusBorderlineUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusSpecification,
        );
    }

    public createPatientStatusAbnormalUseCase(): PatientStatusAbnormalUseCase {
        return new PatientStatusAbnormalUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusSpecification,
        );
    }
}
