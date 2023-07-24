import {Inject, Injectable} from '@nestjs/common';
import {
    CreatePersonContactUseCase,
    DeletePersonContactUseCase,
    SetPersonContactsOrderUseCase,
    UpdatePersonContactUseCase,
    CreateOrganizationContactUseCase,
    UpdateOrganizationContactUseCase,
    DeleteOrganizationContactUseCase,
    SetOrganizationContactsOrderUseCase,
    GetContactsUseCase,
} from 'app/modules/emergency-contact/use-cases/patient';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {
    IPersonEmergencyContactRepository,
    IOrganizationEmergencyContactRepository,
} from 'app/modules/emergency-contact/repositories';
import {IPersonEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/person-emergency-contact-entity.mapper';
import {IOrganizationEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/organization-emergency-contact-entity.mapper';
import {
    PersonEmergencyContactSpecification,
    OrganizationEmergencyContactSpecification,
} from 'app/modules/emergency-contact/specifications';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPersonEmergencyContactRepository)
        private readonly personEmergencyContactRepository: IPersonEmergencyContactRepository,
        @Inject(IOrganizationEmergencyContactRepository)
        private readonly organizationEmergencyContactRepository: IOrganizationEmergencyContactRepository,
        @Inject(IPersonEmergencyContactEntityMapper)
        private readonly personEmergencyContactEntityMapper: IPersonEmergencyContactEntityMapper,
        @Inject(IOrganizationEmergencyContactEntityMapper)
        private readonly organizationEmergencyContactEntityMapper: IOrganizationEmergencyContactEntityMapper,
        @Inject(PersonEmergencyContactSpecification)
        private readonly personEmergencyContactSpecification: PersonEmergencyContactSpecification,
        @Inject(OrganizationEmergencyContactSpecification)
        private readonly organizationEmergencyContactSpecification: OrganizationEmergencyContactSpecification,
    ) {}

    public createCreatePersonContactUseCase(): CreatePersonContactUseCase {
        return new CreatePersonContactUseCase(
            this.authedUserService,
            this.personEmergencyContactRepository,
            this.personEmergencyContactEntityMapper,
            this.personEmergencyContactSpecification,
        );
    }

    public createCreateOrganizationContactUseCase(): CreateOrganizationContactUseCase {
        return new CreateOrganizationContactUseCase(
            this.authedUserService,
            this.organizationEmergencyContactRepository,
            this.organizationEmergencyContactEntityMapper,
            this.organizationEmergencyContactSpecification,
        );
    }

    public createGetContactsUseCase(): GetContactsUseCase {
        return new GetContactsUseCase(
            this.authedUserService,
            this.personEmergencyContactRepository,
            this.organizationEmergencyContactRepository,
        );
    }

    public createUpdatePersonContactUseCase(): UpdatePersonContactUseCase {
        return new UpdatePersonContactUseCase(
            this.authedUserService,
            this.personEmergencyContactRepository,
            this.personEmergencyContactEntityMapper,
            this.personEmergencyContactSpecification,
        );
    }

    public createUpdateOrganizationContactUseCase(): UpdateOrganizationContactUseCase {
        return new UpdateOrganizationContactUseCase(
            this.authedUserService,
            this.organizationEmergencyContactRepository,
            this.organizationEmergencyContactEntityMapper,
            this.organizationEmergencyContactSpecification,
        );
    }

    public createSetPersonContactsOrderUseCase(): SetPersonContactsOrderUseCase {
        return new SetPersonContactsOrderUseCase(
            this.authedUserService,
            this.personEmergencyContactRepository,
            this.personEmergencyContactSpecification,
        );
    }

    public createSetOrganizationContactsOrderUseCase(): SetOrganizationContactsOrderUseCase {
        return new SetOrganizationContactsOrderUseCase(
            this.authedUserService,
            this.organizationEmergencyContactRepository,
            this.organizationEmergencyContactSpecification,
        );
    }

    public createDeletePersonContactUseCase(): DeletePersonContactUseCase {
        return new DeletePersonContactUseCase(
            this.authedUserService,
            this.personEmergencyContactRepository,
            this.personEmergencyContactSpecification,
        );
    }

    public createDeleteOrganizationContactUseCase(): DeleteOrganizationContactUseCase {
        return new DeleteOrganizationContactUseCase(
            this.authedUserService,
            this.organizationEmergencyContactRepository,
            this.organizationEmergencyContactSpecification,
        );
    }
}
