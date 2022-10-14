import {Inject, Injectable} from '@nestjs/common';
import {CreateContactUseCase} from 'app/use-cases/emergency-contact/patient';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {IEmergencyContactRepository} from 'app/repositories';
import {IEmergencyContactEntityMapper} from 'app/mappers/emergency-contact-entity.mapper';
import {EmergencyContactSpecification} from 'app/specifications/emergency-contact.specification';

@Injectable()
export class PatientUseCasesFactory {
    constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IEmergencyContactRepository)
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        @Inject(IEmergencyContactEntityMapper)
        private readonly emergencyContactEntityMapper: IEmergencyContactEntityMapper,
    ) {}

    public createCreateContactUseCase(): CreateContactUseCase {
        const emergencyContactSpecification = new EmergencyContactSpecification();

        return new CreateContactUseCase(
            this.authedUserService,
            this.emergencyContactRepository,
            this.emergencyContactEntityMapper,
            emergencyContactSpecification,
        );
    }
}
