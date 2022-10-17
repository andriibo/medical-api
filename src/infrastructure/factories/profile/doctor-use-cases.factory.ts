import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository, IDoctorMetadataRepository} from 'app/repositories';
import {DoctorProfileUseCase, UpdateDoctorProfileUseCase} from 'app/use-cases/profile/doctor';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {IUserProfileMapper} from 'app/mappers/user-profile.mapper';

@Injectable()
export class DoctorUseCasesFactory {
    constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IDoctorMetadataRepository) private readonly doctorMetadataRepository: IDoctorMetadataRepository,
        @Inject(IUserProfileMapper) private readonly userProfileMapper: IUserProfileMapper,
    ) {}

    public createGetDoctorProfileUseCase(): DoctorProfileUseCase {
        return new DoctorProfileUseCase(this.userRepository, this.authedUserService, this.doctorMetadataRepository);
    }

    public createUpdateDoctorProfileUseCase(): UpdateDoctorProfileUseCase {
        return new UpdateDoctorProfileUseCase(
            this.userRepository,
            this.authedUserService,
            this.doctorMetadataRepository,
            this.userProfileMapper,
        );
    }
}
