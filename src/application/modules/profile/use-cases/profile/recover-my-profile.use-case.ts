import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ProfileSpecification} from 'app/modules/profile/specifications/profile.specification';

export class RecoverMyProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly profileSpecification: ProfileSpecification,
    ) {}

    public async recoverMyProfile(): Promise<void> {
        const user = await this.authedUserService.getUser();
        this.profileSpecification.assertUserCanRecoverHisProfile(user);
        user.deletedAt = null;
        await this.userRepository.persist(user);
    }
}
