import {Inject, Injectable} from '@nestjs/common';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {CaregiverProfileUseCase, UpdateCaregiverProfileUseCase} from 'app/modules/profile/use-cases/caregiver';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';

@Injectable()
export class CaregiverUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
        @Inject(IUserProfileMapper) private readonly userProfileMapper: IUserProfileMapper,
    ) {}

    public createGetCaregiverProfileUseCase(): CaregiverProfileUseCase {
        return new CaregiverProfileUseCase(this.authedUserService, this.fileUrlService);
    }

    public createUpdateCaregiverProfileUseCase(): UpdateCaregiverProfileUseCase {
        return new UpdateCaregiverProfileUseCase(this.userRepository, this.authedUserService, this.userProfileMapper);
    }
}
