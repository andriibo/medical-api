import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ChangePasswordDto} from 'domain/dtos/request/auth/change-password.dto';
import {ProfileSpecification} from 'app/modules/profile/specifications/profile.specification';

export class ChangePasswordUseCase {
    public constructor(
        private readonly authService: IAuthService,
        private readonly profileSpecification: ProfileSpecification,
    ) {}

    public async changePassword(dto: ChangePasswordDto): Promise<void> {
        this.profileSpecification.assertUserCanChangePassword(dto.currentPassword, dto.newPassword);
        await this.authService.changePassword(dto);
    }
}
