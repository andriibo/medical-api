import {EmergencyContactModel} from 'infrastructure/models';
import {IEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/emergency-contact-entity.mapper';
import {ContactDto} from 'domain/dtos/request/emergency-contact/contact.dto';
import {EmergencyContact} from 'domain/entities';
import {SuggestedContactDto} from 'domain/dtos/request/suggested-contact/suggested-contact.dto';

export class EmergencyContactModelMapper implements IEmergencyContactEntityMapper {
    public mapByContactDto(contactDto: ContactDto, contact?: EmergencyContact): EmergencyContact {
        if (!contact) {
            contact = new EmergencyContactModel();
        }

        contact.firstName = contactDto.firstName;
        contact.lastName = contactDto.lastName;
        contact.email = contactDto.email;
        contact.phone = contactDto.phone;
        contact.relationship = contactDto.relationship;

        return contact;
    }

    public mapBySuggestedContactDto(contactDto: SuggestedContactDto): EmergencyContact {
        const contact = new EmergencyContactModel();
        contact.userId = contactDto.patientUserId;
        contact.firstName = contactDto.firstName;
        contact.lastName = contactDto.lastName;
        contact.email = contactDto.email;
        contact.phone = contactDto.phone;
        contact.relationship = contactDto.relationship;

        return contact;
    }
}
