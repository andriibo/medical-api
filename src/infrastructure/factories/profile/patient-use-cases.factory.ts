import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {PatientProfileUseCase, UpdatePatientProfileUseCase} from 'app/modules/profile/use-cases/patient';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {DoctorListProfileUseCase} from 'app/modules/profile/use-cases/patient/doctor-list-profile.use-case';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientMetadataRepository) private readonly patientMetadataRepository: IPatientMetadataRepository,
        @Inject(IUserProfileMapper) private readonly userProfileMapper: IUserProfileMapper,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(IDoctorMetadataRepository) private readonly doctorMetadataRepository: IDoctorMetadataRepository,
    ) {}

    public createGetPatientProfileUseCase(): PatientProfileUseCase {
        return new PatientProfileUseCase(this.authedUserService, this.patientMetadataRepository, this.fileUrlService);
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
            this.doctorMetadataRepository,
            this.userRepository,
        );
    }
}
