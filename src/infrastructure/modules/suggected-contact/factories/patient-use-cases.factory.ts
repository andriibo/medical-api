import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {
    IPersonSuggestedContactRepository,
    IOrganizationSuggestedContactRepository,
} from 'app/modules/suggested-contact/repositories';
import {
    DeletePersonSuggestedContactUseCase,
    DeleteOrganizationSuggestedContactUseCase,
    ApprovePersonSuggestedContactUseCase,
    GetPatientContactsUseCase,
    ApproveOrganizationSuggestedContactUseCase,
} from 'app/modules/suggested-contact/use-cases/patient';
import {
    ApproveOrganizationSuggestedContactByPatientService,
    ApprovePersonSuggestedContactByPatientService,
    DeletePersonSuggestedContactByPatientService,
    DeleteOrganizationSuggestedContactByPatientService,
} from 'app/modules/suggested-contact/services';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';
import {PersonSuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/person-suggested-contact-dto.mapper';
import {OrganizationSuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/organization-suggested-contact-dto.mapper';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPersonSuggestedContactRepository)
        private readonly personSuggestedContactRepository: IPersonSuggestedContactRepository,
        @Inject(IOrganizationSuggestedContactRepository)
        private readonly organizationSuggestedContactRepository: IOrganizationSuggestedContactRepository,
        @Inject(DeletePersonSuggestedContactByPatientService)
        private readonly deleteSuggestedContactByPatientService: DeletePersonSuggestedContactByPatientService,
        @Inject(DeleteOrganizationSuggestedContactByPatientService)
        private readonly deleteOrganizationSuggestedContactByPatientService: DeleteOrganizationSuggestedContactByPatientService,
        @Inject(ApprovePersonSuggestedContactByPatientService)
        private readonly approvePersonSuggestedContactByPatientService: ApprovePersonSuggestedContactByPatientService,
        @Inject(ApproveOrganizationSuggestedContactByPatientService)
        private readonly approveOrganizationSuggestedContactByPatientService: ApproveOrganizationSuggestedContactByPatientService,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(PersonSuggestedContactDtoMapper)
        private readonly personSuggestedContactDtoMapper: PersonSuggestedContactDtoMapper,
        @Inject(OrganizationSuggestedContactDtoMapper)
        private readonly organizationSuggestedContactDtoMapper: OrganizationSuggestedContactDtoMapper,
        @Inject(UserDtoMapper) private readonly userDtoMapper: UserDtoMapper,
    ) {}

    public createDeletePersonSuggestedContactUseCase(): DeletePersonSuggestedContactUseCase {
        return new DeletePersonSuggestedContactUseCase(
            this.authedUserService,
            this.personSuggestedContactRepository,
            this.deleteSuggestedContactByPatientService,
        );
    }

    public createDeleteOrganizationSuggestedContactUseCase(): DeleteOrganizationSuggestedContactUseCase {
        return new DeleteOrganizationSuggestedContactUseCase(
            this.authedUserService,
            this.organizationSuggestedContactRepository,
            this.deleteOrganizationSuggestedContactByPatientService,
        );
    }

    public createApprovePersonSuggestedContactUseCase(): ApprovePersonSuggestedContactUseCase {
        return new ApprovePersonSuggestedContactUseCase(
            this.authedUserService,
            this.personSuggestedContactRepository,
            this.approvePersonSuggestedContactByPatientService,
        );
    }

    public createApproveOrganizationSuggestedContactUseCase(): ApproveOrganizationSuggestedContactUseCase {
        return new ApproveOrganizationSuggestedContactUseCase(
            this.authedUserService,
            this.organizationSuggestedContactRepository,
            this.approveOrganizationSuggestedContactByPatientService,
        );
    }

    public createGetPatientContactsUseCase(): GetPatientContactsUseCase {
        return new GetPatientContactsUseCase(
            this.authedUserService,
            this.personSuggestedContactRepository,
            this.organizationSuggestedContactRepository,
            this.userRepository,
            this.personSuggestedContactDtoMapper,
            this.organizationSuggestedContactDtoMapper,
            this.userDtoMapper,
        );
    }
}
