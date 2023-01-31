import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientListProfileUseCase} from 'app/modules/profile/use-cases/granted-user';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientProfileUseCase} from 'app/modules/profile/use-cases/granted-user/patient-profile.use-case';
import {IMyPatientsService} from 'app/modules/profile/services/my-patients.service';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientMetadataRepository) private readonly patientMetadataRepository: IPatientMetadataRepository,
        @Inject(IPatientCategoryRepository)
        private readonly patientCategoryRepository: IPatientCategoryRepository,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(IMyPatientsService) private readonly myPatientsService: IMyPatientsService,
    ) {}

    public createPatientListUseCase(): PatientListProfileUseCase {
        return new PatientListProfileUseCase(this.authedUserService, this.myPatientsService);
    }

    public createGetPatientProfileUseCase(): PatientProfileUseCase {
        return new PatientProfileUseCase(
            this.userRepository,
            this.authedUserService,
            this.patientMetadataRepository,
            this.patientDataAccessSpecification,
            this.fileUrlService,
            this.patientCategoryRepository,
        );
    }
}
