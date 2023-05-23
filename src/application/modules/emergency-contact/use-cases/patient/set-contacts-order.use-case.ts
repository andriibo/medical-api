import {ContactsOrderDto} from 'domain/dtos/request/emergency-contact/contacts-order.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {EmergencyContactSpecification} from 'app/modules/emergency-contact/specifications/emergency-contact.specification';
import {indexObjects} from 'support/array.helper';
import {EmergencyContact} from 'domain/entities';

export class SetContactsOrderUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        private readonly emergencyContactSpecification: EmergencyContactSpecification,
    ) {}

    public async setOrder(dto: ContactsOrderDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contacts = await this.emergencyContactRepository.getByUserIdOrderedByRank(user.id);

        this.emergencyContactSpecification.assertContactsOrderIsValid(dto, contacts);

        this.setContactsRank(dto, contacts);

        contacts.map(async (contact) => {
            await this.emergencyContactRepository.update(contact);
        });
    }

    private setContactsRank(dto: ContactsOrderDto, contacts: EmergencyContact[]): void {
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
