import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {IUserRepository} from 'app/modules/auth/repositories';
import {ThresholdListUseCase} from 'app/modules/patient-vital-thresholds/use-cases/granted-user';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientVitalThresholdsRepository)
        private readonly patientVitalThresholdsRepository: IPatientVitalThresholdsRepository,
        @Inject(PatientVitalThresholdsSpecification)
        private readonly patientVitalThresholdSpecification: PatientVitalThresholdsSpecification,
    ) {}

    public createPatientVitalThresholdListUseCase(): ThresholdListUseCase {
        return new ThresholdListUseCase(
            this.authedUserService,
            this.userRepository,
            this.patientVitalThresholdsRepository,
            this.patientVitalThresholdSpecification,
        );
    }
}
