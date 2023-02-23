import {User} from 'domain/entities';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {Inject, Injectable, UnauthorizedException, Scope} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {REQUEST} from '@nestjs/core';
import {TokenClaimsModel} from 'infrastructure/aws/cognito/token-claims.model';
import {UserSignedInDto} from 'domain/dtos/response/auth';
import {UserNotActiveError} from 'app/errors/user-not-active.error';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';

@Injectable({scope: Scope.REQUEST})
export class AuthedUserService implements IAuthedUserService {
    public constructor(
        @Inject(REQUEST) private readonly request: any,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(UserDtoService) private readonly userDtoService: UserDtoService,
    ) {}

    public async getUser(): Promise<User> {
        if (!('tokenClaims' in this.request.user)) {
            throw new UnauthorizedException();
        }

        const {tokenClaims} = this.request.user;

        return await this.userRepository.getOneById(tokenClaims.getUserId());
    }

    public async getActiveUserOrFail(): Promise<User> {
        const user = await this.getUser();
        if (user.deletedAt !== null) {
            throw new UserNotActiveError('User is not active.');
        }

        return user;
    }

    public async getUserByTokenAndTokenClaims(token: string, tokenClaims: object): Promise<UserSignedInDto> {
        const tokenClaimsModel = TokenClaimsModel.fromCognitoResponse(tokenClaims);
        const user = await this.userRepository.getOneById(tokenClaimsModel.getUserId());
        const userDto = this.userDtoService.createUserDtoByUser(user);

        return UserSignedInDto.fromTokenData(token, tokenClaimsModel, userDto);
    }
}
