import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientListProfileUseCase} from 'app/modules/profile/use-cases/granted-user';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientProfileUseCase} from 'app/modules/profile/use-cases/granted-user/patient-profile.use-case';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {IMyPatientsService} from 'app/modules/profile/services/my-patients.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(IMyPatientsService) private readonly myPatientsService: IMyPatientsService,
    ) {}

    public createPatientListUseCase(): PatientListProfileUseCase {
        return new PatientListProfileUseCase(
            this.authedUserService,
            this.patientDataAccessRepository,
            this.myPatientsService,
        );
    }

    public createGetPatientProfileUseCase(): PatientProfileUseCase {
        return new PatientProfileUseCase(
            this.authedUserService,
            this.patientDataAccessSpecification,
            this.patientDataAccessRepository,
            this.myPatientsService,
        );
    }
}
