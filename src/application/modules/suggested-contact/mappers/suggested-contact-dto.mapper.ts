import {SuggestedContactDto} from 'domain/dtos/response/suggested-contact/suggested-contact.dto';
import {SuggestedContact} from 'domain/entities/suggested-contact.entity';
import {convertToUnixTimestamp} from 'support/date.helper';

export class SuggestedContactDtoMapper {
    mapBySuggestedContact(suggestedContact: SuggestedContact): SuggestedContactDto {
        const dto = new SuggestedContactDto();
        dto.contactId = suggestedContact.id;
        dto.firstName = suggestedContact.firstName;
        dto.lastName = suggestedContact.lastName;
        dto.email = suggestedContact.email;
        dto.phone = suggestedContact.phone;
        dto.relationship = suggestedContact.relationship;
        dto.suggestedAt = convertToUnixTimestamp(suggestedContact.suggestedAt);

        return dto;
    }
}
