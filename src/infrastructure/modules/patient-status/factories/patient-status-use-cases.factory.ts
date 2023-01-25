import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientStatusUseCase} from 'app/modules/patient-status/use-cases';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {PatientStatusNormalUseCase} from 'app/modules/patient-status/use-cases/patient-status-normal.use-case';
import {IPatientStatusEntityMapper} from 'app/modules/patient-status/mappers/patient-status-entity.mapper';
import {PatientStatusAbnormalUseCase} from 'app/modules/patient-status/use-cases/patient-status-abnormal.use-case';

@Injectable()
export class PatientStatusUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientStatusRepository) private readonly patientStatusRepository: IPatientStatusRepository,
        @Inject(IPatientStatusEntityMapper) private readonly patientStatusMapper: IPatientStatusEntityMapper,
    ) {}

    public createMyPatientStatusUseCase(): PatientStatusUseCase {
        return new PatientStatusUseCase(this.authedUserService, this.patientStatusRepository);
    }

    public createMyPatientStatusNormalUseCase(): PatientStatusNormalUseCase {
        return new PatientStatusNormalUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusMapper,
        );
    }

    public createMyPatientStatusAbnormalUseCase(): PatientStatusAbnormalUseCase {
        return new PatientStatusAbnormalUseCase(
            this.authedUserService,
            this.patientStatusRepository,
            this.patientStatusMapper,
        );
    }
}
