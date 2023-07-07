import {PersonEmergencyContactModel} from 'infrastructure/modules/emergency-contact/models';
import {IPersonEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/person-emergency-contact-entity.mapper';
import {PersonEmergencyContactDto} from 'domain/dtos/request/emergency-contact/person-emergency-contact.dto';
import {PersonEmergencyContact, PersonSuggestedContact} from 'domain/entities';

export class PersonEmergencyContactModelMapper implements IPersonEmergencyContactEntityMapper {
    public mapByPersonEmergencyContactDto(
        contactDto: PersonEmergencyContactDto,
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

    public mapByPersonSuggestedContact(suggestedContact: PersonSuggestedContact): PersonEmergencyContact {
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
