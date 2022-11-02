import {User} from 'domain/entities';
import {ConfirmSignUpUserDto} from 'domain/dtos/request/auth/confirm-sign-up-user.dto';

export interface IAuthEventEmitter {
    emitDoctorCreated(doctor: User): void;

    emitUserActivated(dto: ConfirmSignUpUserDto): void;
}

export const IAuthEventEmitter = Symbol('IAuthEventEmitter');
