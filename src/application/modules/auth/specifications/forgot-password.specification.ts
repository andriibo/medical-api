import {IUserRepository} from 'app/modules/auth/repositories';
import {EntityNotFoundError} from 'app/errors';

export class ForgotPasswordSpecification {
    public constructor(private readonly userRepository: IUserRepository) {}

    public async assertUserExistsByEmail(email: string): Promise<void> {
        const user = await this.userRepository.getOneByEmail(email);

        if (user === null) {
            throw new EntityNotFoundError('Account Not Found.');
        }
    }
}
