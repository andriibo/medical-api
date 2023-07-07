import {PersonEmergencyContactDto} from 'domain/dtos/request/emergency-contact/person-emergency-contact.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPersonEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IPersonEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/person-emergency-contact-entity.mapper';
import {PersonEmergencyContact} from 'domain/entities';
import {PersonEmergencyContactSpecification} from 'app/modules/emergency-contact/specifications';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class UpdatePersonContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly contactRepository: IPersonEmergencyContactRepository,
        private readonly contactEntityMapper: IPersonEmergencyContactEntityMapper,
        private readonly contactSpecification: PersonEmergencyContactSpecification,
    ) {}

    public async updateContact(contactId: string, dto: PersonEmergencyContactDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contact = await this.getContact(contactId);

        this.contactSpecification.assertUserCanUpdateContact(user, contact);

        const modifiedContact = this.contactEntityMapper.mapByPersonEmergencyContactDto(dto, contact);

        await this.contactRepository.update(modifiedContact);
    }

    private async getContact(contactId: string): Promise<PersonEmergencyContact> {
        const contact = await this.contactRepository.getOneById(contactId);

        if (contact === null) {
            throw new EntityNotFoundError('Contact Not Found.');
        }

        return contact;
    }
}
