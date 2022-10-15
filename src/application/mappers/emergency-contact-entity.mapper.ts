import {EmergencyContact} from 'domain/entities';
import {ContactDto} from 'domain/dtos/emergency-contact/contact.dto';

export interface IEmergencyContactEntityMapper {
    mapByContactDto(contactDto: ContactDto, contact?: EmergencyContact): EmergencyContact;
}

export const IEmergencyContactEntityMapper = Symbol('IEmergencyContactEntityMapper');