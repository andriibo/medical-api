import {OrganizationEmergencyContact, OrganizationSuggestedContact} from 'domain/entities';
import {OrganizationEmergencyContactDto} from 'domain/dtos/request/emergency-contact/organization-emergency-contact.dto';

export interface IOrganizationEmergencyContactEntityMapper {
    mapByOrganizationEmergencyContactDto(
        contactDto: OrganizationEmergencyContactDto,
        contact?: OrganizationEmergencyContact,
    ): OrganizationEmergencyContact;
    mapByOrganizationSuggestedContact(suggestedContact: OrganizationSuggestedContact): OrganizationEmergencyContact;
}

export const IOrganizationEmergencyContactEntityMapper = Symbol('IOrganizationEmergencyContactEntityMapper');
