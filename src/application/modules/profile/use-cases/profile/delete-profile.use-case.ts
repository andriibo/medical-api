import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ProfileSpecification} from 'app/modules/profile/specifications/profile.specification';
import {currentUnixTimestamp} from 'app/support/date.helper';

export class DeleteProfileUseCase {
    private readonly THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60;

    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly profileSpecification: ProfileSpecification,
    ) {}

    public async deleteProfile(): Promise<void> {
        const user = await this.authedUserService.getUser();
        this.profileSpecification.assertUserCanDeleteHisProfile(user);
        user.deletedAt = currentUnixTimestamp() + this.THIRTY_DAYS_IN_SECONDS;
        this.userRepository.persist(user);
    }
}
