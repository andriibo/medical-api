import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {ThresholdListUseCase} from 'app/modules/patient-vital-thresholds/use-cases/patient';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientVitalThresholdsRepository)
        private readonly patientVitalThresholdsRepository: IPatientVitalThresholdsRepository,
    ) {}

    public createPatientVitalThresholdListUseCase(): ThresholdListUseCase {
        return new ThresholdListUseCase(
            this.authedUserService,
            this.userRepository,
            this.patientVitalThresholdsRepository,
        );
    }
}
