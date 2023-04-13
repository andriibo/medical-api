import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ChangePasswordDto} from 'domain/dtos/request/auth/change-password.dto';
import {ProfileSpecification} from 'app/modules/profile/specifications/profile.specification';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserRepository} from 'app/modules/auth/repositories';
import {currentUnixTimestamp} from 'app/support/date.helper';

export class ChangePasswordUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly authService: IAuthService,
        private readonly profileSpecification: ProfileSpecification,
        private readonly userRepository: IUserRepository,
    ) {}

    public async changePassword(dto: ChangePasswordDto): Promise<void> {
        this.profileSpecification.assertUserCanChangePassword(dto.currentPassword, dto.newPassword);
        await this.authService.changePassword(dto);

        const user = await this.authedUserService.getUser();
        user.passwordUpdatedAt = currentUnixTimestamp();
        await this.userRepository.persist(user);
    }
}
