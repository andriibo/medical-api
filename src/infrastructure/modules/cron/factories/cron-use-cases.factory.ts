import {Inject, Injectable} from '@nestjs/common';
import {RemoveUsersUseCase} from 'app/modules/profile/use-cases/profile';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IRemoveUsersService} from 'app/modules/profile/services/remove-users.service';

@Injectable()
export class CronUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IRemoveUsersService) private readonly removeUsersService: IRemoveUsersService,
    ) {}

    public createRemoveUsersUseCase(): RemoveUsersUseCase {
        return new RemoveUsersUseCase(this.userRepository, this.removeUsersService);
    }
}
