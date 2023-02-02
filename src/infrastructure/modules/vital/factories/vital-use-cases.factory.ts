import {Inject, Injectable} from '@nestjs/common';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {IVitalEntityMapper} from 'app/modules/vital/mappers/vital-entity.mapper';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {GetVitalsUseCase, SyncVitalsUseCase} from 'app/modules/vital/use-cases';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientOwnsThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-owns-thresholds.specification';

@Injectable()
export class VitalUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IVitalRepository) private readonly vitalRepository: IVitalRepository,
        @Inject(IVitalEntityMapper) private readonly vitalEntityMapper: IVitalEntityMapper,
        @Inject(IPatientVitalThresholdsRepository)
        private readonly patientVitalThresholdsRepository: IPatientVitalThresholdsRepository,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly patientOwnsThresholdsSpecification: PatientOwnsThresholdsSpecification,
    ) {}

    public createGetVitalsUseCase(): GetVitalsUseCase {
        return new GetVitalsUseCase(
            this.authedUserService,
            this.vitalRepository,
            this.patientDataAccessSpecification,
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
