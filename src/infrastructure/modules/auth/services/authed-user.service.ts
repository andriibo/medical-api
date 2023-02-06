import {User} from 'domain/entities';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {Inject, Injectable, UnauthorizedException, Scope} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {REQUEST} from '@nestjs/core';
import {TokenClaimsModel} from 'infrastructure/aws/cognito/token-claims.model';
import {UserSignedInDto} from 'domain/dtos/response/auth';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

@Injectable({scope: Scope.REQUEST})
export class AuthedUserService implements IAuthedUserService {
    public constructor(
        @Inject(REQUEST) private readonly request: any,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
    ) {}

    public async getUser(): Promise<User> {
        if (!('tokenClaims' in this.request.user)) {
            throw new UnauthorizedException();
        }

        const {tokenClaims} = this.request.user;

        return await this.userRepository.getOneById(tokenClaims.getUserId());
    }

    public async syncUserEmailWithExternalProvider(externalProviderEmail: string): Promise<void> {
        const user = await this.getUser();
        user.email = externalProviderEmail;
        this.userRepository.persist(user);
    }

    public async getUserByToken(token: string, tokenClaims: object): Promise<UserSignedInDto> {
        const tokenClaimsModel = TokenClaimsModel.fromCognitoResponse(tokenClaims);
        const user = await this.userRepository.getOneById(tokenClaimsModel.getUserId());
        user.avatar = this.fileUrlService.createUrlToUserAvatar(user.avatar);

        return UserSignedInDto.fromTokenData(token, tokenClaimsModel, user);
    }
}
