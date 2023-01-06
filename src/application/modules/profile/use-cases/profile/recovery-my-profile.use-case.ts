import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ProfileSpecification} from 'app/modules/profile/specifications/profile.specification';

export class RecoveryMyProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly profileSpecification: ProfileSpecification,
    ) {}

    public async recoveryMyProfile(): Promise<void> {
        const user = await this.authedUserService.getUser();
        this.profileSpecification.assertUserCanRecoverHisProfile(user);
        user.deletedAt = null;
        this.userRepository.persist(user);
    }
}
