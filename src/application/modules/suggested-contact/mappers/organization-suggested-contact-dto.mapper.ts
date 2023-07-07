import {OrganizationSuggestedContactDto} from 'domain/dtos/response/suggested-contact';
import {OrganizationSuggestedContact} from 'domain/entities/organization-suggested-contact.entity';
import {convertToUnixTimestamp} from 'support/date.helper';

export class OrganizationSuggestedContactDtoMapper {
    mapByOrganizationSuggestedContact(suggestedContact: OrganizationSuggestedContact): OrganizationSuggestedContactDto {
        const dto = new OrganizationSuggestedContactDto();
        dto.contactId = suggestedContact.id;
        dto.name = suggestedContact.name;
        dto.email = suggestedContact.email;
        dto.phone = suggestedContact.phone;
        dto.fax = suggestedContact.fax;
        dto.type = suggestedContact.type;
        dto.suggestedAt = convertToUnixTimestamp(suggestedContact.suggestedAt);

        return dto;
    }
}
