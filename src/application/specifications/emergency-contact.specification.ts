import {User} from 'domain/entities';
import {CreateContactDto} from 'domain/dtos/emergency-contact/create-contact.dto';
import {UserRole} from 'domain/entities/user.entity';

export class EmergencyContactSpecification {
    private isUserPatient(user: User): boolean {
        return user.role === UserRole.Patient;
    }

    assertUserCanCreateEmergencyContact(user: User, dto: CreateContactDto): void {
        if (!this.isUserPatient(user)) {
            throw new Error('Create Emergency Contact Not Allowed.');
        }
    }
}
