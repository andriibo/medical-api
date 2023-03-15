import {IAuthService} from 'app/modules/auth/services/auth.service';
import {SignInModel} from 'app/modules/auth/models';
import {AuthUserDto} from 'domain/dtos/request/auth/auth-user.dto';
import {UserSignedInDto} from 'domain/dtos/response/auth/user-signed-in.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';

export class SignInUseCase {
    public constructor(
        private readonly authService: IAuthService,
        private readonly authedUserService: IAuthedUserService,
    ) {}

    public async signInUser(dto: AuthUserDto): Promise<UserSignedInDto> {
        const authResult = await this.authService.signIn(SignInModel.fromAuthUserDto(dto));
        const accessTokenClaims = await this.authService.getAccessTokenClaimsByAccessToken(authResult.accessToken);

        return await this.authedUserService.getUserByTokensAndAccessTokenClaims(
            authResult.accessToken,
            authResult.refreshToken,
            accessTokenClaims,
        );
    }
}
