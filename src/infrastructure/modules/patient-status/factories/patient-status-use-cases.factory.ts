import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientStatusUseCase} from 'app/modules/patient-status/use-cases';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';

@Injectable()
export class PatientStatusUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientStatusRepository) private readonly patientStatusRepository: IPatientStatusRepository,
    ) {}

    public createMyPatientStatusUseCase(): PatientStatusUseCase {
        return new PatientStatusUseCase(this.authedUserService, this.patientStatusRepository);
    }
}
