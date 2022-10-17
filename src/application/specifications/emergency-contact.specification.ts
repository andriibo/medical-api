import {EmergencyContact, User} from 'domain/entities';
import {ContactDto} from 'domain/dtos/request/emergency-contact/contact.dto';
import {UserRole} from 'domain/entities/user.entity';
import {EmergencyContactSpecificationError} from 'app/errors/emergency-contact-specification.error';

export class EmergencyContactSpecification {
    assertUserCanCreateContact(user: User, dto: ContactDto): void {
        const isUserPatient = user.role === UserRole.Patient;

        if (!isUserPatient) {
            throw new EmergencyContactSpecificationError('Create Emergency Contact Not Allowed.');
        }
    }

    assertUserCanUpdateContact(user: User, contact: EmergencyContact): void {
        if (!this.isUserOwnerOfContact(user, contact)) {
            throw new EmergencyContactSpecificationError('Update Emergency Contact Not Allowed.');
        }
    }

    assertUserCanDeleteContact(user: User, contact: EmergencyContact): void {
        if (!this.isUserOwnerOfContact(user, contact)) {
            throw new EmergencyContactSpecificationError('Delete Emergency Contact Not Allowed.');
        }
    }

    private isUserOwnerOfContact(user: User, contact: EmergencyContact): boolean {
        return user.userId === contact.userId;
    }
}
