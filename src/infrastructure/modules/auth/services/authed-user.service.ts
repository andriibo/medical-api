import {User} from 'domain/entities';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {Inject, Injectable, UnauthorizedException, Scope} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {REQUEST} from '@nestjs/core';
import {AccessTokenClaimsModel} from 'infrastructure/aws/cognito/access-token-claims.model';
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
        if (!('accessTokenClaims' in this.request.user)) {
            throw new UnauthorizedException();
        }

        const {accessTokenClaims} = this.request.user;

        return await this.userRepository.getOneById(accessTokenClaims.getUserId());
    }

    public async getActiveUserOrFail(): Promise<User> {
        const user = await this.getUser();
        if (user.deletedAt !== null) {
            throw new UserNotActiveError('User is not active.');
        }

        return user;
    }

    public async getUserByTokensAndAccessTokenClaims(
        accessToken: string,
        refreshToken: string,
        accessTokenClaims: object,
    ): Promise<UserSignedInDto> {
        const accessTokenClaimsModel = AccessTokenClaimsModel.fromCognitoResponse(accessTokenClaims);
        const user = await this.userRepository.getOneById(accessTokenClaimsModel.getUserId());
        const userDto = this.userDtoService.createUserDtoByUser(user);

        return UserSignedInDto.fromTokenData(accessToken, refreshToken, accessTokenClaimsModel, userDto);
    }
}
