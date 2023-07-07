import {OrganizationContactDto} from 'domain/dtos/request/emergency-contact/organization-contact.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IOrganizationEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IOrganizationEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/organization-emergency-contact-entity.mapper';
import {OrganizationEmergencyContact} from 'domain/entities';
import {OrganizationEmergencyContactSpecification} from 'app/modules/emergency-contact/specifications';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class UpdateOrganizationContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly contactRepository: IOrganizationEmergencyContactRepository,
        private readonly contactEntityMapper: IOrganizationEmergencyContactEntityMapper,
        private readonly contactSpecification: OrganizationEmergencyContactSpecification,
    ) {}

    public async updateContact(contactId: string, dto: OrganizationContactDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contact = await this.getContact(contactId);

        this.contactSpecification.assertUserCanUpdateContact(user, contact);

        const modifiedContact = this.contactEntityMapper.mapByOrganizationContactDto(dto, contact);

        await this.contactRepository.update(modifiedContact);
    }

    private async getContact(contactId: string): Promise<OrganizationEmergencyContact> {
        const contact = await this.contactRepository.getOneById(contactId);

        if (contact === null) {
            throw new EntityNotFoundError('Contact Not Found.');
        }

        return contact;
    }
}
