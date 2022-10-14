import {EmergencyContactModel} from 'presentation/models';
import {IEmergencyContactEntityMapper} from 'app/mappers/emergency-contact-entity.mapper';
import {CreateContactDto} from 'domain/dtos/emergency-contact/create-contact.dto';
import {EmergencyContact} from 'domain/entities';

export class EmergencyContactModelMapper implements IEmergencyContactEntityMapper {
    mapByCreateContactDto(createContactDto: CreateContactDto): EmergencyContact {
        const contact = new EmergencyContactModel();
        contact.firstName = createContactDto.firstName;
        contact.lastName = createContactDto.lastName;
        contact.email = createContactDto.email;
        contact.phone = createContactDto.phone;
        contact.relationship = createContactDto.relationship;

        return contact;
    }
}
