import {OrganizationEmergencyContactModel} from 'infrastructure/modules/emergency-contact/models';
import {IOrganizationEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/organization-emergency-contact-entity.mapper';
import {OrganizationEmergencyContactDto} from 'domain/dtos/request/emergency-contact/organization-emergency-contact.dto';
import {OrganizationEmergencyContact} from 'domain/entities/organization-emergency-contact.entity';
import {OrganizationTypeEnum} from 'domain/constants/emergency-contact.const';
import {OrganizationSuggestedContact} from 'domain/entities';

export class OrganizationEmergencyContactModelMapper implements IOrganizationEmergencyContactEntityMapper {
    public mapByOrganizationEmergencyContactDto(
        contactDto: OrganizationEmergencyContactDto,
        contact?: OrganizationEmergencyContact,
    ): OrganizationEmergencyContact {
        if (!contact) {
            contact = new OrganizationEmergencyContactModel();
        }

        contact.name = contactDto.name;
        contact.email = contactDto.email;
        contact.phone = contactDto.phone;
        contact.fax = contactDto.fax;
        contact.type = contactDto.type as OrganizationTypeEnum;

        return contact;
    }

    public mapByOrganizationSuggestedContact(
        suggestedContact: OrganizationSuggestedContact,
    ): OrganizationEmergencyContact {
        const contact = new OrganizationEmergencyContactModel();
        contact.userId = suggestedContact.patientUserId;
        contact.name = suggestedContact.name;
        contact.email = suggestedContact.email;
        contact.phone = suggestedContact.phone;
        contact.fax = suggestedContact.fax;
        contact.type = suggestedContact.type;

        return contact;
    }
}
