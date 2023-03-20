import {EmergencyContact, User} from 'domain/entities';
import {UserRole} from 'domain/entities/user.entity';
import {EmergencyContactSpecificationError} from 'app/modules/emergency-contact/errors';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';

export class EmergencyContactSpecification {
    public constructor(private readonly emergencyContactRepository: IEmergencyContactRepository) {}

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

    public async assertUserCanDeleteContact(user: User, contact: EmergencyContact): Promise<void> {
        if (!this.isUserOwnerOfContact(user, contact)) {
            throw new EmergencyContactSpecificationError('Delete Emergency Contact Not Allowed.');
        }

        const contactsQuantity = await this.emergencyContactRepository.countByUserId(user.id);
        if (contactsQuantity <= 1) {
            throw new EmergencyContactSpecificationError('You must have at least one emergency contact.');
        }
    }

    private isUserOwnerOfContact(user: User, contact: EmergencyContact): boolean {
        return user.id === contact.userId;
    }
}
