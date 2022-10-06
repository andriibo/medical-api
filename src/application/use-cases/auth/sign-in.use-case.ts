import {IAuthService} from 'app/services/auth.service';
import {SignInModel} from 'app/models';
import {AuthUserDto} from 'domain/dtos/auth/auth-user.dto';

export class SignInUseCase {
    constructor(private readonly authService: IAuthService) {}

    public async signInUser(dto: AuthUserDto): Promise<string> {
        return await this.authService.signIn(SignInModel.fromAuthUserDto(dto));
    }
}
