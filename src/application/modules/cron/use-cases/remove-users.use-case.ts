import {IUserRepository} from 'app/modules/auth/repositories';
import {CronSpecificationError} from 'app/modules/cron/errors';

export class RemoveUsersUseCase {
    public constructor(private readonly userRepository: IUserRepository) {}

    public async remove(): Promise<void> {
        const users = await this.userRepository.getUsersMarkedDeletedAt();
        users.forEach((user) => {
            try {
                this.userRepository.delete(user);
            } catch (error) {
                throw new CronSpecificationError(error.message);
            }
        });
    }
}
