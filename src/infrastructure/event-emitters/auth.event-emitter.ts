import {User} from 'domain/entities';
import {IAuthEventEmitter} from 'app/modules/auth/event-emitters/auth.event-emitter';
import {Injectable} from '@nestjs/common';
import {EventEmitter2} from '@nestjs/event-emitter';

@Injectable()
export class AuthEventEmitter implements IAuthEventEmitter {
    public constructor(private eventEmitter: EventEmitter2) {}

    public async emitDoctorCreated(doctor: User): Promise<void> {
        await this.eventEmitter.emit('doctor-created', doctor);
    }
}
