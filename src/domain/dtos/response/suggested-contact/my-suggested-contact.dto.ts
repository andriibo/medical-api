import {SuggestedContact} from 'domain/entities';

export class MySuggestedContactDto {
    public contactId: string;

    public firstName: string;

    public lastName: string;

    public email: string;

    public phone: string;

    public relationship: string;

    public suggestedAt: string;

    public static fromSuggestedContact(suggestedContact: SuggestedContact): MySuggestedContactDto {
        const dto = new MySuggestedContactDto();
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
