import {Inject, Injectable} from '@nestjs/common';
import {RemoveUsersUseCase} from 'app/modules/profile/use-cases/profile';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IRemoveUserService} from 'app/modules/profile/services/remove-user.service';
import {RemoveUserService} from 'infrastructure/modules/profile/services/remove-user.service';

@Injectable()
export class CronUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IRemoveUserService) private readonly removeUserService: RemoveUserService,
    ) {}

    public createRemoveUsersUseCase(): RemoveUsersUseCase {
        return new RemoveUsersUseCase(this.userRepository, this.removeUserService);
    }
}
