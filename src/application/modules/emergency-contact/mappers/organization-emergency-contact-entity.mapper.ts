import {OrganizationEmergencyContact, SuggestedContact} from 'domain/entities';
import {OrganizationContactDto} from 'domain/dtos/request/emergency-contact/organization-contact.dto';

export interface IOrganizationEmergencyContactEntityMapper {
    mapByOrganizationContactDto(
        contactDto: OrganizationContactDto,
        contact?: OrganizationEmergencyContact,
    ): OrganizationEmergencyContact;
}

export const IOrganizationEmergencyContactEntityMapper = Symbol('IOrganizationEmergencyContactEntityMapper');
