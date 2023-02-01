import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {IUserRepository} from 'app/modules/auth/repositories';
import {BloodPressureThresholdsUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/blood-pressure-thresholds.use-case';
import {HeartRateThresholdsUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/heart-rate-thresholds.use-case';
import {MeanArterialPressureThresholdsUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/mean-arterial-pressure-thresholds.use-case';
import {OxygenSaturationThresholdUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/oxygen-saturation-threshold.use-case';
import {RespirationRateThresholdsUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/respiration-rate-thresholds.use-case';
import {TemperatureThresholdsUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/temperature-thresholds.use-case';

@Injectable()
export class DoctorUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientVitalThresholdsRepository)
        private readonly patientVitalThresholdsRepository: IPatientVitalThresholdsRepository,
        @Inject(IPatientVitalThresholdsEntityMapper)
        private readonly patientVitalThresholdsEntityMapper: IPatientVitalThresholdsEntityMapper,
        @Inject(PatientVitalThresholdsSpecification)
        private readonly patientVitalThresholdSpecification: PatientVitalThresholdsSpecification,
    ) {}

    public createHeartRateUseCase(): HeartRateThresholdsUseCase {
        return new HeartRateThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.patientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }

    public createTemperatureUseCase(): TemperatureThresholdsUseCase {
        return new TemperatureThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.patientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }

    public createRespirationRateUseCase(): RespirationRateThresholdsUseCase {
        return new RespirationRateThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.patientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }

    public createOxygenSaturationUseCase(): OxygenSaturationThresholdUseCase {
        return new OxygenSaturationThresholdUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.patientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }

    public createBloodPressureUseCase(): BloodPressureThresholdsUseCase {
        return new BloodPressureThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.patientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }

    public createMeanArterialPressureUseCase(): MeanArterialPressureThresholdsUseCase {
        return new MeanArterialPressureThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.patientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }
}
