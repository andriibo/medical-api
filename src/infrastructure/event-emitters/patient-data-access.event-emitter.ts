import {User} from 'domain/entities';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {EventEmitter2} from '@nestjs/event-emitter';
import {Injectable} from '@nestjs/common';

@Injectable()
export class PatientDataAccessEventEmitter implements IPatientDataAccessEventEmitter {
    public constructor(private eventEmitter: EventEmitter2) {}

    public async emitPatientInitiatedAccessForUnregisteredDoctor(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('patient-initiated-data-access-for-unregistered-doctor', patient, grantedEmail);
    }

    public async emitDoctorInitiatedAccessToUnregisteredPatient(doctor: User, patientEmail: string): Promise<void> {
        await this.eventEmitter.emit('doctor-initiated-data-access-to-unregistered-patient', doctor, patientEmail);
    }

    public async emitPatientInitiatedAccessForRegisteredDoctor(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('patient-initiated-data-access-for-registered-doctor', patient, grantedEmail);
    }

    public async emitDoctorInitiatedAccessToRegisteredPatient(doctor: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('doctor-initiated-data-access-to-registered-patient', doctor, grantedEmail);
    }

    public async emitAccessDeletedByPatient(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-deleted-by-patient', patient, grantedEmail);
    }

    public async emitAccessDeletedByDoctor(doctor: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-deleted-by-doctor', doctor, grantedEmail);
    }
}
