import {PersonEmergencyContact} from 'domain/entities';
import {convertToUnixTimestamp} from 'support/date.helper';

export class PersonContactDto {
    public contactId: string;

    public firstName: string;

    public lastName: string;

    public email: string;

    public phone: string;

    public relationship: string;

    public createdAt: number;

    public static fromPersonEmergencyContact(emergencyContact: PersonEmergencyContact): PersonContactDto {
        const dto = new PersonContactDto();
        dto.contactId = emergencyContact.id;
        dto.firstName = emergencyContact.firstName;
        dto.lastName = emergencyContact.lastName;
        dto.email = emergencyContact.email;
        dto.phone = emergencyContact.phone;
        dto.relationship = emergencyContact.relationship;
        dto.createdAt = convertToUnixTimestamp(emergencyContact.createdAt);

        return dto;
    }
}
