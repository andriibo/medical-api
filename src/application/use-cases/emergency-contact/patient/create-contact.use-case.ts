import {CreateContactDto} from 'domain/dtos/emergency-contact/create-contact.dto';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {IEmergencyContactRepository} from 'app/repositories';
import {IEmergencyContactEntityMapper} from 'app/mappers/emergency-contact-entity.mapper';
import {EmergencyContact, User} from 'domain/entities';
import {EmergencyContactSpecification} from 'app/specifications/emergency-contact.specification';

export class CreateContactUseCase {
    constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        private readonly emergencyContactEntityMapper: IEmergencyContactEntityMapper,
        private readonly emergencyContactSpecification: EmergencyContactSpecification,
    ) {}

    public async createContact(dto: CreateContactDto): Promise<void> {
        const user = await this.authedUserService.getUser();

        this.emergencyContactSpecification.assertUserCanCreateEmergencyContact(user, dto);

        const emergencyContact = this.createEmergencyContact(user, dto);

        await this.emergencyContactRepository.create(emergencyContact);
    }

    private createEmergencyContact(patient: User, dto: CreateContactDto): EmergencyContact {
        const emergencyContact = this.emergencyContactEntityMapper.mapByCreateContactDto(dto);
        emergencyContact.userId = patient.userId;

        return emergencyContact;
    }
}
