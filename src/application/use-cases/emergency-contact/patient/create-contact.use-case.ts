import {ContactDto} from 'domain/dtos/request/emergency-contact/contact.dto';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {IEmergencyContactRepository} from 'app/repositories';
import {IEmergencyContactEntityMapper} from 'app/mappers/emergency-contact-entity.mapper';
import {EmergencyContact, User} from 'domain/entities';
import {EmergencyContactSpecification} from 'app/specifications/emergency-contact.specification';

export class CreateContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        private readonly emergencyContactEntityMapper: IEmergencyContactEntityMapper,
        private readonly emergencyContactSpecification: EmergencyContactSpecification,
    ) {}

    public async createContact(dto: ContactDto): Promise<void> {
        const user = await this.authedUserService.getUser();

        this.emergencyContactSpecification.assertUserCanCreateContact(user, dto);

        const emergencyContact = this.createEmergencyContact(user, dto);

        await this.emergencyContactRepository.create(emergencyContact);
    }

    private createEmergencyContact(patient: User, dto: ContactDto): EmergencyContact {
        const emergencyContact = this.emergencyContactEntityMapper.mapByContactDto(dto);
        emergencyContact.userId = patient.userId;

        return emergencyContact;
    }
}
