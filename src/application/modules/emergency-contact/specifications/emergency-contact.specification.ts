import {EmergencyContact, User} from 'domain/entities';
import {UserRole} from 'domain/entities/user.entity';
import {EmergencyContactSpecificationError} from 'app/modules/emergency-contact/errors';

export class EmergencyContactSpecification {
    public assertUserCanCreateContact(user: User): void {
        const isUserPatient = user.role === UserRole.Patient;

        if (!isUserPatient) {
            throw new EmergencyContactSpecificationError('Create Emergency Contact Not Allowed.');
        }
    }

    public assertUserCanUpdateContact(user: User, contact: EmergencyContact): void {
        if (!this.isUserOwnerOfContact(user, contact)) {
            throw new EmergencyContactSpecificationError('Update Emergency Contact Not Allowed.');
        }
    }

    public assertUserCanDeleteContact(user: User, contact: EmergencyContact): void {
        if (!this.isUserOwnerOfContact(user, contact)) {
            throw new EmergencyContactSpecificationError('Delete Emergency Contact Not Allowed.');
        }
    }

    private isUserOwnerOfContact(user: User, contact: EmergencyContact): boolean {
        return user.id === contact.userId;
    }
}
