import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {IPatientVitalThresholdEntityMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';
import {IUserRepository} from 'app/modules/auth/repositories';
import {PatientVitalThresholdsDtoMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-thresholds-dto.mapper';
import {ThresholdListUseCase} from 'app/modules/patient-vital-threshold/use-cases/granted-user';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientVitalThresholdRepository)
        private readonly patientVitalThresholdRepository: IPatientVitalThresholdRepository,
        @Inject(IPatientVitalThresholdEntityMapper)
        private readonly PatientVitalThresholdEntityMapper: IPatientVitalThresholdEntityMapper,
        @Inject(PatientVitalThresholdSpecification)
        private readonly patientVitalThresholdSpecification: PatientVitalThresholdSpecification,
        @Inject(PatientVitalThresholdsDtoMapper)
        private readonly patientVitalThresholdsDtoMapper: PatientVitalThresholdsDtoMapper,
    ) {}

    public createPatientVitalThresholdListUseCase(): ThresholdListUseCase {
        return new ThresholdListUseCase(
            this.authedUserService,
            this.userRepository,
            this.patientVitalThresholdRepository,
            this.patientVitalThresholdSpecification,
            this.patientVitalThresholdsDtoMapper,
        );
    }
}
