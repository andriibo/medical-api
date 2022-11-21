import {User} from 'domain/entities';
import {UserRole} from 'domain/entities/user.entity';
import {EmergencyContactSpecificationError} from 'app/modules/emergency-contact/errors';

export class SuggestedContactSpecification {
    public assertUserCanCreateSuggestedContact(user: User): void {
        const isUserDoctor = user.role === UserRole.Doctor;

        if (!isUserDoctor) {
            throw new EmergencyContactSpecificationError('Create Suggested Contact Not Allowed.');
        }
    }
}
