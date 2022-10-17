import {EmergencyContact} from 'domain/entities';

export class ContactDto {
    contactId: string;

    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    relationship: string;

    createdAt: string;

    static fromEmergencyContact(emergencyContact: EmergencyContact): ContactDto {
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
