import {User} from 'domain/entities';
import {UserSignedInDto} from 'domain/dtos/response/auth';

export interface IAuthedUserService {
    getUser(): Promise<User>;
    getActiveUserOrFail(): Promise<User>;
    getUserByTokensAndAccessTokenClaims(
        accessToken: string,
        refreshToken: string,
        accessTokenClaims: object,
    ): Promise<UserSignedInDto>;
}

export const IAuthedUserService = Symbol('IAuthedUserService');
