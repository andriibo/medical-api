import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {PatientProfileUseCase, UpdatePatientProfileUseCase} from 'app/modules/profile/use-cases/patient';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientMetadataRepository) private readonly patientMetadataRepository: IPatientMetadataRepository,
        @Inject(IUserProfileMapper) private readonly userProfileMapper: IUserProfileMapper,
    ) {}

    public createGetPatientProfileUseCase(): PatientProfileUseCase {
        return new PatientProfileUseCase(this.userRepository, this.authedUserService, this.patientMetadataRepository);
    }

    public createUpdatePatientProfileUseCase(): UpdatePatientProfileUseCase {
        return new UpdatePatientProfileUseCase(
            this.userRepository,
            this.authedUserService,
            this.patientMetadataRepository,
            this.userProfileMapper,
        );
    }
}
