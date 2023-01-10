import {Inject, Injectable} from '@nestjs/common';
import {RemoveUsersUseCase} from 'app/modules/cron/use-cases';
import {IUserRepository} from 'app/modules/auth/repositories';

@Injectable()
export class CronUseCasesFactory {
    public constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

    public removeUsers(): RemoveUsersUseCase {
        return new RemoveUsersUseCase(this.userRepository);
    }
}
