import {User} from 'domain/entities';
import {ConfirmSignUpUserDto} from 'domain/dtos/request/auth/confirm-sign-up-user.dto';

export interface IAuthEventEmitter {
    emitDoctorCreated(doctor: User): void;

    emitPatientCreated(patient: User): void;

    emitCaregiverCreated(caregiver: User): void;

    emitUserActivated(dto: ConfirmSignUpUserDto): void;

    emitUserDeleted(user: User): void;
}

export const IAuthEventEmitter = Symbol('IAuthEventEmitter');
