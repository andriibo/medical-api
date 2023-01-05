import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ProfileSpecification} from 'app/modules/profile/specifications/profile.specification';

export class DeleteProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly profileSpecification: ProfileSpecification,
    ) {}

    public async deleteProfile(): Promise<void> {
        const user = await this.authedUserService.getUser();
        this.profileSpecification.assertUserCanDeleteHisProfile(user);
        user.deletedAt = new Date().toISOString();
        this.userRepository.persist(user);
    }
}
