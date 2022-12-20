import {User} from 'domain/entities';
import {AccessForRegisteredUserService} from 'app/modules/patient-data-access/services/access-for-registered-user.service';

export class AccessForRegisteredCaregiverService extends AccessForRegisteredUserService {
    protected async assertPatientCanGiveAccessForUser(patient: User, grantedUser: User): Promise<void> {
        await this.patientDataAccessSpecification.assertPatientCanGiveAccessForCaregiver(patient, grantedUser);
    }
    protected async sendNotification(patient: User, email: string): Promise<void> {
        await this.patientDataAccessEventEmitter.emitPatientInitiatedAccessForRegisteredCaregiver(patient, email);
    }
}
