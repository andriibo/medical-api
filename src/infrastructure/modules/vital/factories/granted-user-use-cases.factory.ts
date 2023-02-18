import {Inject, Injectable} from '@nestjs/common';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {VitalListUseCase} from 'app/modules/vital/use-cases/granted-user/vital-list.use-case';
import {IThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IVitalRepository) private readonly vitalRepository: IVitalRepository,
        @Inject(IPatientVitalThresholdsRepository)
        private readonly patientVitalThresholdsRepository: IPatientVitalThresholdsRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(IThresholdsDtoService) private readonly thresholdsDtoService: IThresholdsDtoService,
    ) {}

    public createVitalListUseCase(): VitalListUseCase {
        return new VitalListUseCase(
            this.authedUserService,
            this.vitalRepository,
            this.patientDataAccessSpecification,
            this.patientVitalThresholdsRepository,
            this.thresholdsDtoService,
        );
    }
}
