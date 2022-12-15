import {Inject, Injectable} from '@nestjs/common';
import {
    UpdateThresholdsUseCase,
    IDtoPropToThresholdNameMap,
    DtoPropToThresholdNameMaps,
} from 'app/modules/patient-vital-threshold/use-cases/doctor';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {IPatientVitalThresholdEntityMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';
import {IUserRepository} from 'app/modules/auth/repositories';
import {PatientVitalThresholdsDtoMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-thresholds-dto.mapper';

@Injectable()
export class DoctorUseCasesFactory {
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

    public createUpdateHeartRateUseCase(): UpdateThresholdsUseCase {
        return this.createUpdateThresholdUseCase(DtoPropToThresholdNameMaps.heartRate);
    }

    public createUpdateTemperatureUseCase(): UpdateThresholdsUseCase {
        return this.createUpdateThresholdUseCase(DtoPropToThresholdNameMaps.temperature);
    }

    public createUpdateRespirationRateUseCase(): UpdateThresholdsUseCase {
        return this.createUpdateThresholdUseCase(DtoPropToThresholdNameMaps.respirationRate);
    }

    public createUpdateOxygenSaturationUseCase(): UpdateThresholdsUseCase {
        return this.createUpdateThresholdUseCase(DtoPropToThresholdNameMaps.oxygenSaturation);
    }

    public createUpdateBloodPressureUseCase(): UpdateThresholdsUseCase {
        return this.createUpdateThresholdUseCase(DtoPropToThresholdNameMaps.bloodPressure);
    }

    public createUpdateMeanArterialPressureUseCase(): UpdateThresholdsUseCase {
        return this.createUpdateThresholdUseCase(DtoPropToThresholdNameMaps.meanArterialPressure);
    }

    private createUpdateThresholdUseCase(
        dtoPropToThresholdNameMap: IDtoPropToThresholdNameMap[],
    ): UpdateThresholdsUseCase {
        return new UpdateThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdRepository,
            this.PatientVitalThresholdEntityMapper,
            this.patientVitalThresholdSpecification,
            dtoPropToThresholdNameMap,
        );
    }
}
