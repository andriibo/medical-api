import {Inject, Injectable} from '@nestjs/common';
import {
    UpdateThresholdsUseCase,
    IDtoPropToThresholdNameMap,
    DtoPropToThresholdNameMaps,
    ThresholdListUseCase,
} from 'app/modules/patient-vital-threshold/use-cases/doctor';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {IPatientVitalThresholdMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';
import {IUserRepository} from 'app/modules/auth/repositories';

@Injectable()
export class DoctorUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientVitalThresholdRepository)
        private readonly patientVitalThresholdRepository: IPatientVitalThresholdRepository,
        @Inject(IPatientVitalThresholdMapper)
        private readonly patientVitalThresholdMapper: IPatientVitalThresholdMapper,
        @Inject(PatientVitalThresholdSpecification)
        private readonly patientVitalThresholdSpecification: PatientVitalThresholdSpecification,
    ) {}

    public createPatientVitalThresholdListUseCase(): ThresholdListUseCase {
        return new ThresholdListUseCase(
            this.authedUserService,
            this.userRepository,
            this.patientVitalThresholdRepository,
            this.patientVitalThresholdSpecification,
        );
    }

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
            this.patientVitalThresholdMapper,
            this.patientVitalThresholdSpecification,
            dtoPropToThresholdNameMap,
        );
    }
}
