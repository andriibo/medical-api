import {Inject, Injectable} from '@nestjs/common';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {IVitalEntityMapper} from 'app/modules/vital/mappers/vital-entity.mapper';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {GetVitalsUseCase, SyncVitalsUseCase} from 'app/modules/vital/use-cases';

@Injectable()
export class VitalUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IVitalRepository) private readonly vitalRepository: IVitalRepository,
        @Inject(IVitalEntityMapper) private readonly vitalEntityMapper: IVitalEntityMapper,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public createGetVitalsUseCase(): GetVitalsUseCase {
        return new GetVitalsUseCase(this.authedUserService, this.vitalRepository, this.patientDataAccessSpecification);
    }

    public createSyncPatientVitalsUseCase(): SyncVitalsUseCase {
        return new SyncVitalsUseCase(this.authedUserService, this.vitalRepository, this.vitalEntityMapper);
    }
}
