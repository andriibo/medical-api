import {User} from 'domain/entities';
import {IAuthEventEmitter} from 'app/modules/auth/event-emitters/auth.event-emitter';
import {Injectable} from '@nestjs/common';
import {EventEmitter2} from '@nestjs/event-emitter';
import {ConfirmSignUpUserDto} from 'domain/dtos/request/auth/confirm-sign-up-user.dto';

@Injectable()
export class AuthEventEmitter implements IAuthEventEmitter {
    public constructor(private eventEmitter: EventEmitter2) {}

    public async emitDoctorCreated(doctor: User): Promise<void> {
        await this.eventEmitter.emit('doctor-created', doctor);
    }

    public async emitPatientCreated(patient: User): Promise<void> {
        await this.eventEmitter.emit('patient-created', patient);
    }

    public async emitUserActivated(dto: ConfirmSignUpUserDto): Promise<void> {
        await this.eventEmitter.emit('user-activated', dto);
    }
}
