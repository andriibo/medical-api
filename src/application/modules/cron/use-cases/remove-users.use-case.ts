import {IUserRepository} from 'app/modules/auth/repositories';

export class RemoveUsersUseCase {
    public constructor(private readonly userRepository: IUserRepository) {}

    public async remove(): Promise<void> {
        const users = await this.userRepository.getUsersMarkedDeletedAt();
        users.forEach((user) => {
            try {
                this.userRepository.delete(user);
            } catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
