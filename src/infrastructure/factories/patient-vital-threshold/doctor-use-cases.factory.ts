import {Inject, Injectable} from '@nestjs/common';
import {
    UpdateThresholdsUseCase,
    ThresholdNameToPropNamePair,
} from 'app/modules/patient-vital-threshold/use-cases/doctor';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {IPatientVitalThresholdMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';
import {VitalThresholdName} from 'domain/entities/patient-vital-threshold.entity';

const thresholdNameToPropNamePairs = {
    heartRate: [
        {
            thresholdName: VitalThresholdName.MinHR,
            dtoPropName: 'min',
        },
        {
            thresholdName: VitalThresholdName.MaxHR,
            dtoPropName: 'max',
        },
    ],
};

@Injectable()
export class DoctorUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientVitalThresholdRepository)
        private readonly patientVitalThresholdRepository: IPatientVitalThresholdRepository,
        @Inject(IPatientVitalThresholdMapper)
        private readonly patientVitalThresholdMapper: IPatientVitalThresholdMapper,
        @Inject(PatientVitalThresholdSpecification)
        private readonly patientVitalThresholdSpecification: PatientVitalThresholdSpecification,
    ) {}

    public createUpdateHeartRateUseCase(): UpdateThresholdsUseCase {
        return new UpdateThresholdsUseCase(
            this.authedUserService,
            this.patientVitalThresholdRepository,
            this.patientVitalThresholdMapper,
            this.patientVitalThresholdSpecification,
            thresholdNameToPropNamePairs.heartRate as ThresholdNameToPropNamePair[],
        );
    }
}
