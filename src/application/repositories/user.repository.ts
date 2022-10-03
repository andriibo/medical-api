import {User} from 'domain/entities/user.entity';

export interface IUserRepository {
    create(entity: User): Promise<void>;
}

export const IUserRepository = Symbol('IUserRepository');
