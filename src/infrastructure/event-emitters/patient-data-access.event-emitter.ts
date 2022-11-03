import {User} from 'domain/entities';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {EventEmitter2} from '@nestjs/event-emitter';
import {Injectable} from '@nestjs/common';

@Injectable()
export class PatientDataAccessEventEmitter implements IPatientDataAccessEventEmitter {
    public constructor(private eventEmitter: EventEmitter2) {}

    public async emitAccessForUnregisteredUserInitiated(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-for-unregistered-user-initiated', patient, grantedEmail);
    }

    public async emitAccessForRegisteredUserInitiated(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-for-registered-user-initiated', patient, grantedEmail);
    }

    public async emitAccessForPatientDeleted(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-for-patient-deleted', patient, grantedEmail);
    }
}
