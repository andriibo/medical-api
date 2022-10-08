import {User} from 'domain/entities/user.entity';

export interface IUserRepository {
    create(entity: User): Promise<void>;

    getByUserId(userId: string): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
