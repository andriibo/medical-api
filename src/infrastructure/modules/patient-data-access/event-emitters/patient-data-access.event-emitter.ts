import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {EventEmitter2} from '@nestjs/event-emitter';
import {Injectable} from '@nestjs/common';

@Injectable()
export class PatientDataAccessEventEmitter implements IPatientDataAccessEventEmitter {
    public constructor(private eventEmitter: EventEmitter2) {}

    public async emitPatientInitiatedAccessForUnregisteredDoctor(patient: User, doctorEmail: string): Promise<void> {
        await this.eventEmitter.emit('patient-initiated-data-access-for-unregistered-doctor', patient, doctorEmail);
    }

    public async emitPatientInitiatedAccessForUnregisteredCaregiver(
        patient: User,
        caregiverEmail: string,
    ): Promise<void> {
        await this.eventEmitter.emit(
            'patient-initiated-data-access-for-unregistered-caregiver',
            patient,
            caregiverEmail,
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

    public async emitPatientInitiatedAccessForRegisteredDoctor(patient: User, doctorEmail: string): Promise<void> {
        await this.eventEmitter.emit('patient-initiated-data-access-for-registered-doctor', patient, doctorEmail);
    }

    public async emitPatientInitiatedAccessForRegisteredCaregiver(
        patient: User,
        caregiverEmail: string,
    ): Promise<void> {
        await this.eventEmitter.emit('patient-initiated-data-access-for-registered-caregiver', patient, caregiverEmail);
    }

    public async emitGrantedUserInitiatedAccessToRegisteredPatient(
        grantedUser: User,
        patientEmail: string,
    ): Promise<void> {
        await this.eventEmitter.emit(
            'granted-user-initiated-data-access-to-registered-patient',
            grantedUser,
            patientEmail,
        );
    }

    public async emitGrantedUserResentRequestToPatient(
        grantedUser: User,
        dataAccess: PatientDataAccess,
    ): Promise<void> {
        if (dataAccess.patientUser) {
            await this.emitGrantedUserInitiatedAccessToRegisteredPatient(grantedUser, dataAccess.patientUser.email);
        } else if (dataAccess.patientEmail) {
            await this.emitGrantedUserInitiatedAccessToUnregisteredPatient(grantedUser, dataAccess.patientEmail);
        }
    }

    public async emitAccessDeletedByPatient(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-deleted-by-patient', patient, grantedEmail);
    }

    public async emitAccessWithdrawnByPatient(patient: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-withdrawn-by-patient', patient, grantedEmail);
    }

    public async emitAccessDeletedByGrantedUser(grantedUser: User, patientEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-deleted-by-granted-user', grantedUser, patientEmail);
    }

    public async emitAccessWithdrawnByGrantedUser(grantedUser: User, patientEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-withdrawn-by-granted-user', grantedUser, patientEmail);
    }

    public async emitDataAccessApproved(dataAccess: PatientDataAccess): Promise<void> {
        await this.eventEmitter.emit('data-access-approved', dataAccess);
    }
}
