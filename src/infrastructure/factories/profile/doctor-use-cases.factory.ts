import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {
    DoctorProfileUseCase,
    UpdateDoctorProfileUseCase,
    PatientProfileUseCase,
} from 'app/modules/profile/use-cases/doctor';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

@Injectable()
export class DoctorUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IDoctorMetadataRepository) private readonly doctorMetadataRepository: IDoctorMetadataRepository,
        @Inject(IPatientMetadataRepository) private readonly patientMetadataRepository: IPatientMetadataRepository,
        @Inject(IUserProfileMapper) private readonly userProfileMapper: IUserProfileMapper,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
    ) {}

    public createGetDoctorProfileUseCase(): DoctorProfileUseCase {
        return new DoctorProfileUseCase(this.authedUserService, this.doctorMetadataRepository, this.fileUrlService);
    }

    public createUpdateDoctorProfileUseCase(): UpdateDoctorProfileUseCase {
        return new UpdateDoctorProfileUseCase(
            this.userRepository,
            this.authedUserService,
            this.doctorMetadataRepository,
            this.userProfileMapper,
        );
    }

    public createGetPatientProfileUseCase(): PatientProfileUseCase {
        return new PatientProfileUseCase(
            this.userRepository,
            this.authedUserService,
            this.patientMetadataRepository,
            this.patientDataAccessSpecification,
        );
    }
}
