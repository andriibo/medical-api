import {EmergencyContact} from 'domain/entities';
import {CreateContactDto} from 'domain/dtos/emergency-contact/create-contact.dto';

export interface IEmergencyContactEntityMapper {
    mapByCreateContactDto(createContactDto: CreateContactDto): EmergencyContact;
}

export const IEmergencyContactEntityMapper = Symbol('IEmergencyContactEntityMapper');
