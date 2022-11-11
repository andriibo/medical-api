import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ChangePasswordDto} from 'domain/dtos/request/auth/change-password.dto';

export class ChangePasswordUseCase {
    public constructor(private readonly authService: IAuthService) {}

    public async changePassword(dto: ChangePasswordDto): Promise<void> {
        await this.authService.changePassword(dto);
    }
}
