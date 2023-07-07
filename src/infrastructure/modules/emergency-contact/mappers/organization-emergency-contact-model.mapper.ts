import {OrganizationEmergencyContactModel} from 'infrastructure/modules/emergency-contact/models';
import {IOrganizationEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/organization-emergency-contact-entity.mapper';
import {OrganizationContactDto} from 'domain/dtos/request/emergency-contact/organization-contact.dto';
import {OrganizationEmergencyContact, OrganizationType} from 'domain/entities/organization-emergency-contact.entity';

export class OrganizationEmergencyContactModelMapper implements IOrganizationEmergencyContactEntityMapper {
    public mapByOrganizationContactDto(
        contactDto: OrganizationContactDto,
        contact?: OrganizationEmergencyContact,
    ): OrganizationEmergencyContact {
        if (!contact) {
            contact = new OrganizationEmergencyContactModel();
        }

        contact.name = contactDto.name;
        contact.email = contactDto.email;
        contact.phone = contactDto.phone;
        contact.fax = contactDto.fax;
        contact.type = contactDto.type as OrganizationType;

        return contact;
    }
}
