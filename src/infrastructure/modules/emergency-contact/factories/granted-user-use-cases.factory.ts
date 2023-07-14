import {Inject, Injectable} from '@nestjs/common';
import {
    PatientContactListUseCase,
    GetPatientContactsUseCase,
} from 'app/modules/emergency-contact/use-cases/granted-user';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {
    IOrganizationEmergencyContactRepository,
    IPersonEmergencyContactRepository,
} from 'app/modules/emergency-contact/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPersonEmergencyContactRepository)
        private readonly personEmergencyContactRepository: IPersonEmergencyContactRepository,
        @Inject(IOrganizationEmergencyContactRepository)
        private readonly organizationEmergencyContactRepository: IOrganizationEmergencyContactRepository,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public createPatientContactUseCase(): PatientContactListUseCase {
        return new PatientContactListUseCase(
            this.authedUserService,
            this.personEmergencyContactRepository,
            this.patientDataAccessSpecification,
        );
    }

    public createGetPatientContactsUseCase(): GetPatientContactsUseCase {
        return new GetPatientContactsUseCase(
            this.authedUserService,
            this.personEmergencyContactRepository,
            this.organizationEmergencyContactRepository,
            this.patientDataAccessSpecification,
        );
    }
}
