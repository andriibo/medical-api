import {Inject, Injectable} from '@nestjs/common';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {VitalListUseCase} from 'app/modules/vital/use-cases/granted-user/vital-list.use-case';
import {VitalsDtoService} from 'app/modules/vital/services/vitals-dto.service';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IVitalRepository) private readonly vitalRepository: IVitalRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(VitalsDtoService) private readonly vitalsDtoService: VitalsDtoService,
    ) {}

    public createVitalListUseCase(): VitalListUseCase {
        return new VitalListUseCase(
            this.authedUserService,
            this.vitalRepository,
            this.patientDataAccessSpecification,
            this.vitalsDtoService,
        );
    }
}
