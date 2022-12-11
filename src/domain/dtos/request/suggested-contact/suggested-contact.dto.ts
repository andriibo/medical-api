import {SuggestedContact} from 'domain/entities';

export class SuggestedContactDto {
    public contactId: string;

    public patientUserId?: string;

    public firstName: string;

    public lastName: string;

    public email: string;

    public phone: string;

    public relationship: string;

    public suggestedBy: string;

    public suggestedAt: string;

    public static fromSuggestedContact(suggestedContact: SuggestedContact): SuggestedContactDto {
        const dto = new SuggestedContactDto();
        dto.contactId = suggestedContact.id;
        dto.firstName = suggestedContact.firstName;
        dto.lastName = suggestedContact.lastName;
        dto.email = suggestedContact.email;
        dto.phone = suggestedContact.phone;
        dto.relationship = suggestedContact.relationship;
        dto.suggestedBy = suggestedContact.suggestedBy;
        dto.suggestedAt = suggestedContact.suggestedAt;

        return dto;
    }
}
