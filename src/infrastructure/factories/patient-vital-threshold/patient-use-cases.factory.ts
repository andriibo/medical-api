import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {ThresholdListUseCase} from 'app/modules/patient-vital-threshold/use-cases/patient';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientVitalThresholdRepository)
        private readonly patientVitalThresholdRepository: IPatientVitalThresholdRepository,
    ) {}

    public createPatientVitalThresholdListUseCase(): ThresholdListUseCase {
        return new ThresholdListUseCase(
            this.authedUserService,
            this.userRepository,
            this.patientVitalThresholdRepository,
        );
    }
}
