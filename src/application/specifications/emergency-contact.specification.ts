import {EmergencyContact, User} from 'domain/entities';
import {CreateContactDto} from 'domain/dtos/emergency-contact/create-contact.dto';
import {UserRole} from 'domain/entities/user.entity';

export class EmergencyContactSpecification {
    assertUserCanCreateContact(user: User, dto: CreateContactDto): void {
        const isUserPatient = user.role === UserRole.Patient;

        if (!isUserPatient) {
            throw new Error('Create Emergency Contact Not Allowed.');
        }
    }

    assertUserCanDeleteContact(user: User, contact: EmergencyContact): void {
        const isUserOwnerOfContact = user.userId === contact.userId;

        if (!isUserOwnerOfContact) {
            throw new Error('Delete Emergency Contact Not Allowed.');
        }
    }
}
