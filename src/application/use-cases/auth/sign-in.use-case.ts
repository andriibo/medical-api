import {Inject, Injectable} from '@nestjs/common';
import {IAuthService} from 'app/abstractions/services/auth.service';
import {SignInModel} from 'app/abstractions/models';
import {SignInUserView} from 'presentation/views/auth';

@Injectable()
export class SignInUseCase {
    constructor(@Inject(IAuthService) private readonly authService: IAuthService) {}

    public async signInUser(requestBody: SignInUserView): Promise<string> {
        const result = await this.authService.signIn(new SignInModel(requestBody.userName, requestBody.password));

        return result;
    }
}
