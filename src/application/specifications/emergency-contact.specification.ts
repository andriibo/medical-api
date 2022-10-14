import {EmergencyContact, User} from 'domain/entities';
import {CreateContactDto} from 'domain/dtos/emergency-contact/create-contact.dto';
import {UserRole} from 'domain/entities/user.entity';
import {EmergencyContactSpecificationError} from 'app/errors/emergency-contact-specification.error';

export class EmergencyContactSpecification {
    assertUserCanCreateContact(user: User, dto: CreateContactDto): void {
        const isUserPatient = user.role === UserRole.Patient;

        if (!isUserPatient) {
            throw new EmergencyContactSpecificationError('Create Emergency Contact Not Allowed.');
        }
    }

    assertUserCanDeleteContact(user: User, contact: EmergencyContact): void {
        const isUserOwnerOfContact = user.userId === contact.userId;

        if (!isUserOwnerOfContact) {
            throw new EmergencyContactSpecificationError('Delete Emergency Contact Not Allowed.');
        }
    }
}
