import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UpdateBloodPressureThresholdsUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/update-blood-pressure-thresholds.use-case';
import {UpdateHeartRateThresholdsUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/update-heart-rate-thresholds.use-case';
import {UpdateMeanArterialPressureThresholdsUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/update-mean-arterial-pressure-thresholds.use-case';
import {UpdateOxygenSaturationThresholdUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/update-oxygen-saturation-threshold.use-case';
import {UpdateRespirationRateThresholdsUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/update-respiration-rate-thresholds.use-case';
import {UpdateTemperatureThresholdsUseCase} from 'app/modules/patient-vital-thresholds/use-cases/doctor/update-temperature-thresholds.use-case';

@Injectable()
export class DoctorUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientVitalThresholdsRepository)
        private readonly patientVitalThresholdsRepository: IPatientVitalThresholdsRepository,
        @Inject(IPatientVitalThresholdsEntityMapper)
        private readonly PatientVitalThresholdsEntityMapper: IPatientVitalThresholdsEntityMapper,
        @Inject(PatientVitalThresholdsSpecification)
        private readonly patientVitalThresholdSpecification: PatientVitalThresholdsSpecification,
    ) {}

    public createUpdateHeartRateUseCase(): UpdateHeartRateThresholdsUseCase {
        return new UpdateHeartRateThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.PatientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }

    public createUpdateTemperatureUseCase(): UpdateTemperatureThresholdsUseCase {
        return new UpdateTemperatureThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.PatientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }

    public createUpdateRespirationRateUseCase(): UpdateRespirationRateThresholdsUseCase {
        return new UpdateRespirationRateThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.PatientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }

    public createUpdateOxygenSaturationUseCase(): UpdateOxygenSaturationThresholdUseCase {
        return new UpdateOxygenSaturationThresholdUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.PatientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }

    public createUpdateBloodPressureUseCase(): UpdateBloodPressureThresholdsUseCase {
        return new UpdateBloodPressureThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.PatientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }

    public createUpdateMeanArterialPressureUseCase(): UpdateMeanArterialPressureThresholdsUseCase {
        return new UpdateMeanArterialPressureThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdsRepository,
            this.PatientVitalThresholdsEntityMapper,
            this.patientVitalThresholdSpecification,
        );
    }
}
