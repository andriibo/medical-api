import {IAuthService} from 'app/services/auth.service';
import {SignInModel} from 'app/models';
import {AuthUserDto} from 'domain/dtos/auth-user.dto';
import {UserSignedInView} from 'presentation/views/auth/user-signed-in.view';

export class SignInUseCase {
    constructor(private readonly authService: IAuthService) {}

    public async signInUser(dto: AuthUserDto): Promise<object> {
        const token = await this.authService.signIn(SignInModel.fromAuthUserDto(dto));

        return UserSignedInView.fromToken(token);
    }
}
