import {EmergencyContactModel} from 'infrastructure/models';
import {IEmergencyContactEntityMapper} from 'app/mappers/emergency-contact-entity.mapper';
import {ContactDto} from 'domain/dtos/request/emergency-contact/contact.dto';
import {EmergencyContact} from 'domain/entities';

export class EmergencyContactModelMapper implements IEmergencyContactEntityMapper {
    mapByContactDto(contactDto: ContactDto, contact?: EmergencyContact): EmergencyContact {
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
}
