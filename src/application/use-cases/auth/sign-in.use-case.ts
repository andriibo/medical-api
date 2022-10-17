import {IAuthService} from 'app/services/auth.service';
import {SignInModel} from 'app/models';
import {AuthUserDto} from 'domain/dtos/request/auth/auth-user.dto';
import {UserSignedInDto} from 'domain/dtos/response/auth/user-signed-in.dto';

export class SignInUseCase {
    constructor(private readonly authService: IAuthService) {}

    public async signInUser(dto: AuthUserDto): Promise<UserSignedInDto> {
        const token = await this.authService.signIn(SignInModel.fromAuthUserDto(dto));

        return UserSignedInDto.fromToken(token);
    }
}
