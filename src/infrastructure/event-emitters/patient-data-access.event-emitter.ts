import {User} from 'domain/entities';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {EventEmitter2} from '@nestjs/event-emitter';
import {Injectable} from '@nestjs/common';

@Injectable()
export class PatientDataAccessEventEmitter implements IPatientDataAccessEventEmitter {
    public constructor(private eventEmitter: EventEmitter2) {}

    public async emitPatientInitiatedAccessForUnregisteredGrantedUser(
        patient: User,
        grantedEmail: string,
    ): Promise<void> {
        await this.eventEmitter.emit(
            'patient-initiated-data-access-for-unregistered-granted-user',
            patient,
            grantedEmail,
        );
    }

    public async emitGrantedUserInitiatedAccessToUnregisteredPatient(
        grantedUser: User,
        patientEmail: string,
    ): Promise<void> {
        await this.eventEmitter.emit(
            'granted-user-initiated-data-access-to-unregistered-patient',
            grantedUser,
            patientEmail,
        );
    }

    public async emitPatientInitiatedAccessForRegisteredGrantedUser(
        patient: User,
        grantedEmail: string,
    ): Promise<void> {
        await this.eventEmitter.emit(
            'patient-initiated-data-access-for-registered-granted-user',
            patient,
            grantedEmail,
        );
    }

    public async emitGrantedUserInitiatedAccessToRegisteredPatient(
        grantedUser: User,
        grantedEmail: string,
    ): Promise<void> {
        await this.eventEmitter.emit(
            'granted-user-initiated-data-access-to-registered-patient',
            grantedUser,
            grantedEmail,
        );
    }

    public async emitAccessDeletedByPatient(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-deleted-by-patient', patient, grantedEmail);
    }

    public async emitAccessDeletedByGrantedUser(grantedUser: User, patientEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-deleted-by-granted-user', grantedUser, patientEmail);
    }
}
