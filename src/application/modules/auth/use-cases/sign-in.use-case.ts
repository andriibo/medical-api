import {IAuthService} from 'app/modules/auth/services/auth.service';
import {AuthResultModel, SignInModel} from 'app/modules/auth/models';
import {AuthUserDto} from 'domain/dtos/request/auth/auth-user.dto';
import {UserSignedInDto} from 'domain/dtos/response/auth/user-signed-in.dto';
import {TokenClaimsModel} from 'infrastructure/aws/cognito/token-claims.model';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

export class SignInUseCase {
    public constructor(
        private readonly authService: IAuthService,
        private readonly userRepository: IUserRepository,
        private readonly fileUrlService: IFileUrlService,
    ) {}

    public async signInUser(dto: AuthUserDto): Promise<UserSignedInDto> {
        const authResult = await this.authService.signIn(SignInModel.fromAuthUserDto(dto));
        return await this.getSignedInUser(authResult);
    }

    private async getSignedInUser(authResult: AuthResultModel): Promise<UserSignedInDto> {
        const tokenClaims = await this.authService.getTokenClaims(authResult.token);
        const tokenClaimsModel = TokenClaimsModel.fromCognitoResponse(tokenClaims);
        const user = await this.userRepository.getOneById(tokenClaimsModel.getUserId());
        user.avatar = this.fileUrlService.createUrlToUserAvatar(user.avatar);

        return UserSignedInDto.fromTokenData(authResult.token, tokenClaimsModel, user);
    }
}
