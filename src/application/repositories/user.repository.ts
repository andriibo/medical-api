import {User} from 'domain/entities/user.entity';

export interface IUserRepository {
    create(entity: User): Promise<void>;

    getOneByUserId(userId: string): Promise<User>;

    getByUserIds(userIds: string[]): Promise<User[]>;

    getOneByEmail(email: string): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
