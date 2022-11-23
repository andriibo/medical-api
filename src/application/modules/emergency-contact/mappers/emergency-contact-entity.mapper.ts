import {EmergencyContact} from 'domain/entities';
import {ContactDto} from 'domain/dtos/request/emergency-contact/contact.dto';
import {SuggestedContactDto} from 'domain/dtos/response/suggested-contact/suggested-contact.dto';

export interface IEmergencyContactEntityMapper {
    mapByContactDto(contactDto: ContactDto, contact?: EmergencyContact): EmergencyContact;
    mapBySuggestedContactDto(contactDto: SuggestedContactDto): EmergencyContact;
}

export const IEmergencyContactEntityMapper = Symbol('IEmergencyContactEntityMapper');
