import {Inject, Injectable} from '@nestjs/common';
import {IPatientDataAccessRepository, IVitalRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {GetVitalsUseCase, SyncVitalsUseCase} from 'app/use-cases/vitals';

@Injectable()
export class VitalUseCasesFactory {
    constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IVitalRepository) private readonly vitalRepository: IVitalRepository,
        @Inject(IVitalRepository) private readonly patientDataAccessRepository: IPatientDataAccessRepository,
    ) {}

    public getVitals(): GetVitalsUseCase {
        return new GetVitalsUseCase(this.authedUserService, this.patientDataAccessRepository, this.vitalRepository);
    }

    public syncPatientVitals(): SyncVitalsUseCase {
        return new SyncVitalsUseCase(this.authedUserService, this.vitalRepository);
    }
}
