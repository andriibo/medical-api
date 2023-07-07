import {IOrganizationSuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/organization-suggested-contact-entity.mapper';
import {OrganizationSuggestedContactDto} from 'domain/dtos/request/suggested-contact/organization-suggested-contact.dto';
import {OrganizationSuggestedContact} from 'domain/entities/organization-suggested-contact.entity';
import {OrganizationSuggestedContactModel} from 'infrastructure/modules/suggected-contact/models';
import {OrganizationType} from 'domain/entities/organization-emergency-contact.entity';

export class OrganizationSuggestedContactModelMapper implements IOrganizationSuggestedContactEntityMapper {
    public mapByOrganizationSuggestedContactDto(
        suggestedContactDto: OrganizationSuggestedContactDto,
    ): OrganizationSuggestedContact {
        const suggestedContact = new OrganizationSuggestedContactModel();
        suggestedContact.patientUserId = suggestedContactDto.patientUserId;
        suggestedContact.name = suggestedContactDto.name;
        suggestedContact.email = suggestedContactDto.email;
        suggestedContact.phone = suggestedContactDto.phone;
        suggestedContact.fax = suggestedContactDto.fax;
        suggestedContact.type = suggestedContactDto.type as OrganizationType;

        return suggestedContact;
    }
}
