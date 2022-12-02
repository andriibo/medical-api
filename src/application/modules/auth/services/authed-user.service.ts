import {User} from 'domain/entities';

export interface IAuthedUserService {
    getUser(): Promise<User>;
    syncUserEmailWithExternalProvider(externalProviderEmail: string): Promise<void>;
}

export const IAuthedUserService = Symbol('IAuthedUserService');
