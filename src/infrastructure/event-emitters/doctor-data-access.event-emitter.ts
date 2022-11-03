import {User} from 'domain/entities';
import {EventEmitter2} from '@nestjs/event-emitter';
import {Injectable} from '@nestjs/common';
import {IDoctorDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/doctor-data-access.event-emitter';

@Injectable()
export class DoctorDataAccessEventEmitter implements IDoctorDataAccessEventEmitter {
    public constructor(private eventEmitter: EventEmitter2) {}

    public async emitAccessForPatientDeleted(doctor: User, grantedEmail: string): Promise<void> {
        await this.eventEmitter.emit('data-access-for-patient-deleted', doctor, grantedEmail);
    }
}
