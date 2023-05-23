import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {PatientProfileUseCase, UpdatePatientProfileUseCase} from 'app/modules/profile/use-cases/patient';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {DoctorListProfileUseCase} from 'app/modules/profile/use-cases/patient/doctor-list-profile.use-case';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {CaregiverListProfileUseCase} from 'app/modules/profile/use-cases/patient/caregiver-list-profile.use-case';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientMetadataRepository) private readonly patientMetadataRepository: IPatientMetadataRepository,
        @Inject(IUserProfileMapper) private readonly userProfileMapper: IUserProfileMapper,
        @Inject(UserDtoMapper) private readonly userDtoMapper: UserDtoMapper,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
    ) {}

    public createGetPatientProfileUseCase(): PatientProfileUseCase {
        return new PatientProfileUseCase(this.authedUserService, this.patientMetadataRepository, this.userDtoMapper);
    }

    public createUpdatePatientProfileUseCase(): UpdatePatientProfileUseCase {
        return new UpdatePatientProfileUseCase(
            this.userRepository,
            this.authedUserService,
            this.patientMetadataRepository,
            this.userProfileMapper,
        );
    }

    public createDoctorListUseCase(): DoctorListProfileUseCase {
        return new DoctorListProfileUseCase(
            this.authedUserService,
            this.patientDataAccessRepository,
            this.userDtoMapper,
        );
    }

    public createCaregiverListUseCase(): CaregiverListProfileUseCase {
        return new CaregiverListProfileUseCase(
            this.authedUserService,
            this.patientDataAccessRepository,
            this.userDtoMapper,
        );
    }
}
