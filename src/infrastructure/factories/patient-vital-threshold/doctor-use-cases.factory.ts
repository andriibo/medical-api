import {Inject, Injectable} from '@nestjs/common';
import {UpdateHeartRateUseCase} from 'app/modules/patient-vital-threshold/use-cases/doctor';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {IPatientVitalThresholdMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';

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

    public createUpdateHeartRateUseCase(): UpdateHeartRateUseCase {
        return new UpdateHeartRateUseCase(
            this.authedUserService,
            this.patientVitalThresholdRepository,
            this.patientVitalThresholdMapper,
            this.patientVitalThresholdSpecification,
        );
    }
}
