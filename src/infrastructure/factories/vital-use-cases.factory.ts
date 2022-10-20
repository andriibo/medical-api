import {Inject, Injectable} from '@nestjs/common';
import {IVitalRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';
import {GetVitalsUseCase, SyncVitalsUseCase} from 'app/use-cases/vitals';

@Injectable()
export class VitalUseCasesFactory {
    constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IVitalRepository) private readonly vitalRepository: IVitalRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public getVitals(): GetVitalsUseCase {
        return new GetVitalsUseCase(this.authedUserService, this.vitalRepository, this.patientDataAccessSpecification);
    }

    public syncPatientVitals(): SyncVitalsUseCase {
        return new SyncVitalsUseCase(this.authedUserService, this.vitalRepository);
    }
}
