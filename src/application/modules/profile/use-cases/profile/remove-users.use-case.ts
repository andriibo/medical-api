import {IUserRepository} from 'app/modules/auth/repositories';
import {IRemoveUsersService} from 'app/modules/profile/services/remove-users.service';

export class RemoveUsersUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly removeUsersService: IRemoveUsersService,
    ) {}

    public async removeMarkedForDeleting(): Promise<void> {
        const users = await this.userRepository.getUsersForDeletingMarkedDeletedAt();
        users.forEach((user) => {
            this.removeUsersService.delete(user);
        });
    }
}
