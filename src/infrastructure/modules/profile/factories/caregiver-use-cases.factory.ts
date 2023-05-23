import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {CaregiverProfileUseCase, UpdateCaregiverProfileUseCase} from 'app/modules/profile/use-cases/caregiver';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';

@Injectable()
export class CaregiverUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(UserDtoMapper) private readonly userDtoMapper: UserDtoMapper,
        @Inject(IUserProfileMapper) private readonly userProfileMapper: IUserProfileMapper,
    ) {}

    public createGetCaregiverProfileUseCase(): CaregiverProfileUseCase {
        return new CaregiverProfileUseCase(this.authedUserService, this.userDtoMapper);
    }

    public createUpdateCaregiverProfileUseCase(): UpdateCaregiverProfileUseCase {
        return new UpdateCaregiverProfileUseCase(this.userRepository, this.authedUserService, this.userProfileMapper);
    }
}
