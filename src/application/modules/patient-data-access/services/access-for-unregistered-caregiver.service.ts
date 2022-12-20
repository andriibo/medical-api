import {User} from 'domain/entities';
import {AccessForUnregisteredUserService} from 'app/modules/patient-data-access/services/access-for-unregistered-user.service';

export class AccessForUnregisteredCaregiverService extends AccessForUnregisteredUserService {
    protected async sendNotification(patient: User, email: string): Promise<void> {
        await this.patientDataAccessEventEmitter.emitPatientInitiatedAccessForUnregisteredCaregiver(patient, email);
    }
}
