import {IUserRepository} from 'app/modules/auth/repositories';
import {IRemoveUserService} from 'app/modules/profile/services/remove-user.service';

export class RemoveUsersUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly removeUserService: IRemoveUserService,
    ) {}

    public async removeMarkedForDeleting(): Promise<void> {
        const users = await this.userRepository.getUsersForDeletingMarkedDeletedAt();
        users.forEach((user) => {
            this.removeUserService.delete(user);
        });
    }
}
