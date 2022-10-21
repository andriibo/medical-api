import {Inject, Injectable} from '@nestjs/common';
import {IVitalRepository} from 'app/modules/vitals/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {GetVitalsUseCase, SyncVitalsUseCase} from 'app/modules/vitals/use-cases';

@Injectable()
export class VitalUseCasesFactory {
    public constructor(
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
