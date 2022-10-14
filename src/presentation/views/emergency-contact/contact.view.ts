import {ApiProperty} from '@nestjs/swagger';
import {EmergencyContact} from 'domain/entities/emergency-contact.entity';

export class ContactView {
    @ApiProperty()
    contactId: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    relationship: string;

    @ApiProperty()
    createdAt: string;

    static fromEmergencyContact(emergencyContact: EmergencyContact): ContactView {
        const view = new ContactView();
        view.contactId = emergencyContact.contactId;
        view.firstName = emergencyContact.firstName;
        view.lastName = emergencyContact.lastName;
        view.email = emergencyContact.email;
        view.phone = emergencyContact.phone;
        view.relationship = emergencyContact.relationship;
        view.createdAt = emergencyContact.createdAt;

        return view;
    }
}
