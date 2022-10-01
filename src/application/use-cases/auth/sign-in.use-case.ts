import {IAuthService} from 'app/abstractions/services/auth.service';
import {SignInModel} from 'app/abstractions/models';
import {AuthUserDto} from 'domain/dtos/auth-user.dto';

export class SignInUseCase {
    constructor(private readonly authService: IAuthService) {}

    public async signInUser(dto: AuthUserDto): Promise<string> {
        return await this.authService.signIn(SignInModel.fromAuthUserDto(dto));
    }
}
