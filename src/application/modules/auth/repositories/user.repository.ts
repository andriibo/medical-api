import {User} from 'domain/entities/user.entity';

export interface IUserRepository {
    persist(entity: User): Promise<User>;

    updateAvatar(entity: User): Promise<void>;

    getOneById(userId: string): Promise<User>;

    getOneByIdOrFail(userId: string): Promise<User>;

    getByIds(userIds: string[]): Promise<User[]>;

    getOneByEmail(email: string): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
