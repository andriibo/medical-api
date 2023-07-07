import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {
    IPersonSuggestedContactRepository,
    IOrganizationSuggestedContactRepository,
} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {IPersonSuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/person-suggested-contact-entity.mapper';
import {IOrganizationSuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/organization-suggested-contact-entity.mapper';
import {
    CreatePersonSuggestedContactUseCase,
    CreateOrganizationSuggestedContactUseCase,
    DeletePersonSuggestedContactUseCase,
    DeleteOrganizationSuggestedContactUseCase,
    PatientContactListUseCase,
    GetGrantedUserContactsUseCase,
} from 'app/modules/suggested-contact/use-cases/granted-user';
import {
    DeletePersonSuggestedContactByGrantedUserService,
    DeleteOrganizationSuggestedContactByGrantedUserService,
} from 'app/modules/suggested-contact/services';
import {PersonSuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/person-suggested-contact-dto.mapper';
import {OrganizationSuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/organization-suggested-contact-dto.mapper';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPersonSuggestedContactRepository)
        private readonly personSuggestedContactRepository: IPersonSuggestedContactRepository,
        @Inject(IOrganizationSuggestedContactRepository)
        private readonly organizationSuggestedContactRepository: IOrganizationSuggestedContactRepository,
        @Inject(IPersonSuggestedContactEntityMapper)
        private readonly personSuggestedContactEntityMapper: IPersonSuggestedContactEntityMapper,
        @Inject(IOrganizationSuggestedContactEntityMapper)
        private readonly organizationSuggestedContactEntityMapper: IOrganizationSuggestedContactEntityMapper,
        @Inject(PersonSuggestedContactDtoMapper)
        private readonly personSuggestedContactDtoMapper: PersonSuggestedContactDtoMapper,
        @Inject(OrganizationSuggestedContactDtoMapper)
        private readonly organizationSuggestedContactDtoMapper: OrganizationSuggestedContactDtoMapper,
        @Inject(SuggestedContactSpecification)
        private readonly suggestedContactSpecification: SuggestedContactSpecification,
        @Inject(DeletePersonSuggestedContactByGrantedUserService)
        private readonly deleteSuggestedContactByGrantedUserService: DeletePersonSuggestedContactByGrantedUserService,
        @Inject(DeleteOrganizationSuggestedContactByGrantedUserService)
        private readonly deleteOrganizationSuggestedContactByGrantedUserService: DeleteOrganizationSuggestedContactByGrantedUserService,
    ) {}

    public createPersonSuggestedContactUseCase(): CreatePersonSuggestedContactUseCase {
        return new CreatePersonSuggestedContactUseCase(
            this.authedUserService,
            this.personSuggestedContactRepository,
            this.personSuggestedContactEntityMapper,
            this.suggestedContactSpecification,
        );
    }

    public createOrganizationSuggestedContactUseCase(): CreateOrganizationSuggestedContactUseCase {
        return new CreateOrganizationSuggestedContactUseCase(
            this.authedUserService,
            this.organizationSuggestedContactRepository,
            this.organizationSuggestedContactEntityMapper,
            this.suggestedContactSpecification,
        );
    }

    public createDeletePersonSuggestedContactUseCase(): DeletePersonSuggestedContactUseCase {
        return new DeletePersonSuggestedContactUseCase(
            this.authedUserService,
            this.personSuggestedContactRepository,
            this.deleteSuggestedContactByGrantedUserService,
        );
    }

    public createDeleteOrganizationSuggestedContactUseCase(): DeleteOrganizationSuggestedContactUseCase {
        return new DeleteOrganizationSuggestedContactUseCase(
            this.authedUserService,
            this.organizationSuggestedContactRepository,
            this.deleteOrganizationSuggestedContactByGrantedUserService,
        );
    }

    public createPatientContactUseCase(): PatientContactListUseCase {
        return new PatientContactListUseCase(
            this.authedUserService,
            this.personSuggestedContactRepository,
            this.personSuggestedContactDtoMapper,
        );
    }

    public createGetGrantedUserContactsUseCase(): GetGrantedUserContactsUseCase {
        return new GetGrantedUserContactsUseCase(
            this.authedUserService,
            this.personSuggestedContactRepository,
            this.organizationSuggestedContactRepository,
            this.personSuggestedContactDtoMapper,
            this.organizationSuggestedContactDtoMapper,
        );
    }
}
