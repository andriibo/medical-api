import {User} from 'domain/entities';
import {UserSignedInDto} from 'domain/dtos/response/auth';

export interface IAuthedUserService {
    getUser(): Promise<User>;
    syncUserEmailWithExternalProvider(externalProviderEmail: string): Promise<void>;
    getSignedUserByTokenClaims(token: string, tokenClaims: object): Promise<UserSignedInDto>;
}

export const IAuthedUserService = Symbol('IAuthedUserService');
