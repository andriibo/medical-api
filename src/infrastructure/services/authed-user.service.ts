import {User} from 'domain/entities';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {Inject, Injectable, UnauthorizedException, Scope} from '@nestjs/common';
import {IUserRepository} from 'app/repositories';
import {REQUEST} from '@nestjs/core';

@Injectable({scope: Scope.REQUEST})
export class AuthedUserService implements IAuthedUserService {
    constructor(
        @Inject(REQUEST) private readonly request: any,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    ) {}

    async getUser(): Promise<User> {
        if (!('tokenClaims' in this.request)) {
            throw new UnauthorizedException();
        }

        const {tokenClaims} = this.request;

        return await this.userRepository.getOneByUserId(tokenClaims.getUserId());
    }
}
