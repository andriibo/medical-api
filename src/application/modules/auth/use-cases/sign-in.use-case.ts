import {IAuthService} from 'app/modules/auth/services/auth.service';
import {AuthResultModel, SignInModel} from 'app/modules/auth/models';
import {AuthUserDto} from 'domain/dtos/request/auth/auth-user.dto';
import {UserSignedInDto} from 'domain/dtos/response/auth/user-signed-in.dto';

export class SignInUseCase {
    public constructor(private readonly authService: IAuthService) {}

    public async signInUser(dto: AuthUserDto): Promise<UserSignedInDto> {
        const authResult = await this.authService.signIn(SignInModel.fromAuthUserDto(dto));
        return await this.getSignedInUser(authResult);
    }

    private async getSignedInUser(authResult: AuthResultModel): Promise<UserSignedInDto> {
        const tokenClaims = await this.authService.getTokenClaims(authResult.token);
        return UserSignedInDto.fromTokenData(authResult.token, tokenClaims);
    }
}
