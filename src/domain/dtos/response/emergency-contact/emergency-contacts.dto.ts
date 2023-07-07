import {PersonEmergencyContactDto} from './person-emergency-contact.dto';
import {OrganizationEmergencyContactDto} from './organization-emergency-contact.dto';

export class EmergencyContactsDto {
    public persons: PersonEmergencyContactDto[] = [];

    public organizations: OrganizationEmergencyContactDto[] = [];
}
