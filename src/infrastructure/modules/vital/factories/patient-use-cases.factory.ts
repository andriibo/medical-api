import {Inject, Injectable} from '@nestjs/common';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {IVitalEntityMapper} from 'app/modules/vital/mappers/vital-entity.mapper';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {SyncVitalsUseCase} from 'app/modules/vital/use-cases/patient/sync-vitals.use-case';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientOwnsThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-owns-thresholds.specification';
import {VitalListUseCase} from 'app/modules/vital/use-cases/patient/vital-list.use-case';
import {IUserRepository} from 'app/modules/auth/repositories';
import {ThresholdsDtoService} from 'infrastructure/modules/patient-vital-thresholds/services/thresholds-dto.service';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IVitalRepository) private readonly vitalRepository: IVitalRepository,
        @Inject(IVitalEntityMapper) private readonly vitalEntityMapper: IVitalEntityMapper,
        @Inject(IPatientVitalThresholdsRepository)
        private readonly patientVitalThresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly patientOwnsThresholdsSpecification: PatientOwnsThresholdsSpecification,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    ) {}

    public createVitalListUseCase(): VitalListUseCase {
        return new VitalListUseCase(
            this.authedUserService,
            this.vitalRepository,
            this.patientVitalThresholdsRepository,
            new ThresholdsDtoService(this.userRepository),
        );
    }

    public createSyncPatientVitalsUseCase(): SyncVitalsUseCase {
        return new SyncVitalsUseCase(
            this.authedUserService,
            this.vitalRepository,
            this.vitalEntityMapper,
            this.patientOwnsThresholdsSpecification,
        );
    }
}
