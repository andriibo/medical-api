import {SuggestedContact} from 'domain/entities';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class SuggestedContactDto {
    public contactId: string;

    public firstName: string;

    public lastName: string;

    public email: string;

    public phone: string;

    public relationship: string;

    public suggestedAt: string;

    public createdByUser: UserDto;

    public static fromSuggestedContact(suggestedContact: SuggestedContact): SuggestedContactDto {
        const dto = new SuggestedContactDto();
        dto.contactId = suggestedContact.id;
        dto.firstName = suggestedContact.firstName;
        dto.lastName = suggestedContact.lastName;
        dto.email = suggestedContact.email;
        dto.phone = suggestedContact.phone;
        dto.relationship = suggestedContact.relationship;
        dto.suggestedAt = suggestedContact.suggestedAt;

        return dto;
    }
}
