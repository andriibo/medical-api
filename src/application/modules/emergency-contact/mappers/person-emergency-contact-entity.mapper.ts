import {PersonEmergencyContact, PersonSuggestedContact} from 'domain/entities';
import {PersonEmergencyContactDto} from 'domain/dtos/request/emergency-contact/person-emergency-contact.dto';

export interface IPersonEmergencyContactEntityMapper {
    mapByPersonEmergencyContactDto(
        contactDto: PersonEmergencyContactDto,
        contact?: PersonEmergencyContact,
    ): PersonEmergencyContact;
    mapByPersonSuggestedContact(contactDto: PersonSuggestedContact): PersonEmergencyContact;
}

export const IPersonEmergencyContactEntityMapper = Symbol('IPersonEmergencyContactEntityMapper');
