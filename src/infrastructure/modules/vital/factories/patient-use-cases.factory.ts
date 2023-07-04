import {Inject, Injectable} from '@nestjs/common';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {IVitalEntityMapper} from 'app/modules/vital/mappers/vital-entity.mapper';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {SyncVitalsUseCase} from 'app/modules/vital/use-cases/patient/sync-vitals.use-case';
import {PatientOwnsThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-owns-thresholds.specification';
import {VitalListUseCase} from 'app/modules/vital/use-cases/patient/vital-list.use-case';
import {VitalsDtoService} from 'app/modules/vital/services/vitals-dto.service';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IVitalRepository) private readonly vitalRepository: IVitalRepository,
        @Inject(IVitalEntityMapper) private readonly vitalEntityMapper: IVitalEntityMapper,
        private readonly patientOwnsThresholdsSpecification: PatientOwnsThresholdsSpecification,
        @Inject(VitalsDtoService) private readonly vitalsDtoService: VitalsDtoService,
    ) {}

    public createVitalListUseCase(): VitalListUseCase {
        return new VitalListUseCase(this.authedUserService, this.vitalRepository, this.vitalsDtoService);
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
