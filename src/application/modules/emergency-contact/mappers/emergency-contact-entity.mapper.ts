import {EmergencyContact, SuggestedContact} from 'domain/entities';
import {ContactDto} from 'domain/dtos/request/emergency-contact/contact.dto';

export interface IEmergencyContactEntityMapper {
    mapByContactDto(contactDto: ContactDto, contact?: EmergencyContact): EmergencyContact;
    mapBySuggestedContactDto(contactDto: SuggestedContact): EmergencyContact;
}

export const IEmergencyContactEntityMapper = Symbol('IEmergencyContactEntityMapper');
