import {PersonSuggestedContactDto} from 'domain/dtos/response/suggested-contact/person-suggested-contact.dto';
import {PersonSuggestedContact} from 'domain/entities/person-suggested-contact.entity';
import {convertToUnixTimestamp} from 'support/date.helper';

export class PersonSuggestedContactDtoMapper {
    mapByPersonSuggestedContact(suggestedContact: PersonSuggestedContact): PersonSuggestedContactDto {
        const dto = new PersonSuggestedContactDto();
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
