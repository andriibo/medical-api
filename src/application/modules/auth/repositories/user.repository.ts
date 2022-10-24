import {User} from 'domain/entities/user.entity';

export interface IUserRepository {
    create(entity: User): Promise<User>;

    updateUserAndMetadata(entity: User): Promise<void>;

    getOneById(userId: string): Promise<User>;

    getByIds(userIds: string[]): Promise<User[]>;

    getOneByEmail(email: string): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
