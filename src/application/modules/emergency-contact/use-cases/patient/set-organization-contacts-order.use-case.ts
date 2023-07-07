import {ContactsOrderDto} from 'domain/dtos/request/emergency-contact/contacts-order.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IOrganizationEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {OrganizationEmergencyContactSpecification} from 'app/modules/emergency-contact/specifications';
import {indexObjects} from 'support/array.helper';
import {OrganizationEmergencyContact} from 'domain/entities';

export class SetOrganizationContactsOrderUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly contactRepository: IOrganizationEmergencyContactRepository,
        private readonly contactSpecification: OrganizationEmergencyContactSpecification,
    ) {}

    public async setOrder(dto: ContactsOrderDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contacts = await this.contactRepository.getByUserIdOrderedByRank(user.id);

        this.contactSpecification.assertContactsOrderIsValid(dto, contacts);

        this.setContactsRank(dto, contacts);

        contacts.map(async (contact) => {
            await this.contactRepository.update(contact);
        });
    }

    private setContactsRank(dto: ContactsOrderDto, contacts: OrganizationEmergencyContact[]): void {
        const indexedContacts = indexObjects(contacts, 'id');

        dto.contactIds.map((contactId, index) => {
            indexedContacts[contactId].rank = index;
        });

        contacts
            .filter((contact) => !dto.contactIds.includes(contact.id))
            .map((contact, index) => {
                contact.rank = dto.contactIds.length + index;
            });
    }
}
