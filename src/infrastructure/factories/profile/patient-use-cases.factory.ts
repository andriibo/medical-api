import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {PatientProfileUseCase, UpdatePatientProfileUseCase} from 'app/modules/profile/use-cases/patient';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {UploadAvatarPatientProfileUseCase} from 'app/modules/profile/use-cases/patient/upload-avatar-patient-profile.use-case';
import {UploadAvatarService} from 'app/modules/profile/services/upload-avatar.service';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientMetadataRepository) private readonly patientMetadataRepository: IPatientMetadataRepository,
        @Inject(IUserProfileMapper) private readonly userProfileMapper: IUserProfileMapper,
        @Inject(UploadAvatarService) private readonly uploadAvatarService: UploadAvatarService,
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

    public uploadAvatarPatientProfileUseCase(): UploadAvatarPatientProfileUseCase {
        return new UploadAvatarPatientProfileUseCase(
            this.userRepository,
            this.authedUserService,
            this.uploadAvatarService,
        );
    }
}
