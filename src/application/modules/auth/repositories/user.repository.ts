import {PatientVitalThresholds, User} from 'domain/entities';

export interface IUserRepository {
    insertPatient(patient: User, vitalThresholds: PatientVitalThresholds): Promise<User>;

    persist(entity: User): Promise<User>;

    updateAvatar(entity: User): Promise<void>;

    getOneById(userId: string): Promise<User>;

    getOneByIdOrFail(userId: string): Promise<User>;

    getByIds(userIds: string[]): Promise<User[]>;

    getOneByEmail(email: string): Promise<User>;

    getUsersForDeletingMarkedDeletedAt(): Promise<User[]>;
}

export const IUserRepository = Symbol('IUserRepository');
