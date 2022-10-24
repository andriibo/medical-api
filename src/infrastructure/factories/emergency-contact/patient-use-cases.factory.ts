import {Inject, Injectable} from '@nestjs/common';
import {
    CreateContactUseCase,
    ContactListUseCase,
    DeleteContactUseCase,
    UpdateContactUseCase,
} from 'app/modules/emergency-contact/use-cases/patient';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/emergency-contact-entity.mapper';
import {EmergencyContactSpecification} from 'app/modules/emergency-contact/specifications/emergency-contact.specification';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IEmergencyContactRepository)
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        @Inject(IEmergencyContactEntityMapper)
        private readonly emergencyContactEntityMapper: IEmergencyContactEntityMapper,
        @Inject(EmergencyContactSpecification)
        private readonly emergencyContactSpecification: EmergencyContactSpecification,
    ) {}

    public createCreateContactUseCase(): CreateContactUseCase {
        return new CreateContactUseCase(
            this.authedUserService,
            this.emergencyContactRepository,
            this.emergencyContactEntityMapper,
            this.emergencyContactSpecification,
        );
    }

    public createContactListUseCase(): ContactListUseCase {
        return new ContactListUseCase(this.authedUserService, this.emergencyContactRepository);
    }

    public createUpdateContactUseCase(): UpdateContactUseCase {
        return new UpdateContactUseCase(
            this.authedUserService,
            this.emergencyContactRepository,
            this.emergencyContactEntityMapper,
            this.emergencyContactSpecification,
        );
    }

    public createDeleteContactUseCase(): DeleteContactUseCase {
        return new DeleteContactUseCase(
            this.authedUserService,
            this.emergencyContactRepository,
            this.emergencyContactSpecification,
        );
    }
}
