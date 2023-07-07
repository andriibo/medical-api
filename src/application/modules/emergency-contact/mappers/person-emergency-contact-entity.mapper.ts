import {PersonEmergencyContact, SuggestedContact} from 'domain/entities';
import {PersonContactDto} from 'domain/dtos/request/emergency-contact/person-contact.dto';

export interface IPersonEmergencyContactEntityMapper {
    mapByPersonContactDto(contactDto: PersonContactDto, contact?: PersonEmergencyContact): PersonEmergencyContact;
    mapBySuggestedContact(contactDto: SuggestedContact): PersonEmergencyContact;
}

export const IPersonEmergencyContactEntityMapper = Symbol('IPersonEmergencyContactEntityMapper');
