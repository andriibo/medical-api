import {OrganizationEmergencyContact} from 'domain/entities';
import {convertToUnixTimestamp} from 'support/date.helper';

export class OrganizationContactDto {
    public contactId: string;

    public name: string;

    public email: string | null;

    public phone: string;

    public fax: string | null;

    public type: string;

    public createdAt: number;

    public static fromOrganizationEmergencyContact(
        emergencyContact: OrganizationEmergencyContact,
    ): OrganizationContactDto {
        const dto = new OrganizationContactDto();
        dto.contactId = emergencyContact.id;
        dto.name = emergencyContact.name;
        dto.email = emergencyContact.email;
        dto.phone = emergencyContact.phone;
        dto.fax = emergencyContact.fax;
        dto.type = emergencyContact.type;
        dto.createdAt = convertToUnixTimestamp(emergencyContact.createdAt);

        return dto;
    }
}
