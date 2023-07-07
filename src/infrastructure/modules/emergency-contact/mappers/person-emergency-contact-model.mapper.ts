import {PersonEmergencyContactModel} from 'infrastructure/modules/emergency-contact/models';
import {IPersonEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/person-emergency-contact-entity.mapper';
import {PersonContactDto} from 'domain/dtos/request/emergency-contact/person-contact.dto';
import {PersonEmergencyContact, SuggestedContact} from 'domain/entities';

export class PersonEmergencyContactModelMapper implements IPersonEmergencyContactEntityMapper {
    public mapByPersonContactDto(
        contactDto: PersonContactDto,
        contact?: PersonEmergencyContact,
    ): PersonEmergencyContact {
        if (!contact) {
            contact = new PersonEmergencyContactModel();
        }

        contact.firstName = contactDto.firstName;
        contact.lastName = contactDto.lastName;
        contact.email = contactDto.email;
        contact.phone = contactDto.phone;
        contact.relationship = contactDto.relationship;

        return contact;
    }

    public mapBySuggestedContact(suggestedContact: SuggestedContact): PersonEmergencyContact {
        const contact = new PersonEmergencyContactModel();
        contact.userId = suggestedContact.patientUserId;
        contact.firstName = suggestedContact.firstName;
        contact.lastName = suggestedContact.lastName;
        contact.email = suggestedContact.email;
        contact.phone = suggestedContact.phone;
        contact.relationship = suggestedContact.relationship;

        return contact;
    }
}
