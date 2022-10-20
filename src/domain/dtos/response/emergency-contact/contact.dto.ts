import {EmergencyContact} from 'domain/entities';

export class ContactDto {
    public contactId: string;

    public firstName: string;

    public lastName: string;

    public email: string;

    public phone: string;

    public relationship: string;

    public createdAt: string;

    public static fromEmergencyContact(emergencyContact: EmergencyContact): ContactDto {
        const dto = new ContactDto();
        dto.contactId = emergencyContact.contactId;
        dto.firstName = emergencyContact.firstName;
        dto.lastName = emergencyContact.lastName;
        dto.email = emergencyContact.email;
        dto.phone = emergencyContact.phone;
        dto.relationship = emergencyContact.relationship;
        dto.createdAt = emergencyContact.createdAt;

        return dto;
    }
}
