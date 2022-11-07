import {User} from 'domain/entities';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {EventEmitter2} from '@nestjs/event-emitter';
import {Injectable} from '@nestjs/common';

@Injectable()
export class PatientDataAccessEventEmitter implements IPatientDataAccessEventEmitter {
    public constructor(private eventEmitter: EventEmitter2) {}

    public async emitAccessForUnregisteredUserInitiatedByPatient(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-for-unregistered-user-initiated-by-patient', patient, grantedEmail);
    }

    public async emitAccessForUnregisteredUserInitiatedByDoctor(doctor: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-for-unregistered-user-initiated-by-doctor', doctor, grantedEmail);
    }

    public async emitAccessForRegisteredUserInitiatedByPatient(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-for-registered-user-initiated-by-patient', patient, grantedEmail);
    }

    public async emitAccessForRegisteredUserInitiatedByDoctor(doctor: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-for-registered-user-initiated-by-doctor', doctor, grantedEmail);
    }

    public async emitAccessDeletedByPatient(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-deleted-by-patient', patient, grantedEmail);
    }

    public async emitAccessDeletedByDoctor(doctor: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-deleted-by-doctor', doctor, grantedEmail);
    }
}
