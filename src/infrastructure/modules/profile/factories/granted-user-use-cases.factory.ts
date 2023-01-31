import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientListProfileUseCase} from 'app/modules/profile/use-cases/granted-user';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientProfileUseCase} from 'app/modules/profile/use-cases/granted-user/patient-profile.use-case';
import {IVitalRepository} from 'app/modules/vitals/repositories';
import {IPatientRelationshipRepository} from 'app/modules/patient-relationship/repositories';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientMetadataRepository) private readonly patientMetadataRepository: IPatientMetadataRepository,
        @Inject(IPatientRelationshipRepository)
        private readonly patientRelationshipRepository: IPatientRelationshipRepository,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(IVitalRepository) private readonly vitalRepository: IVitalRepository,
    ) {}

    public createPatientListUseCase(): PatientListProfileUseCase {
        return new PatientListProfileUseCase(
            this.authedUserService,
            this.patientRelationshipRepository,
            this.fileUrlService,
            this.vitalRepository,
        );
    }

    public createGetPatientProfileUseCase(): PatientProfileUseCase {
        return new PatientProfileUseCase(
            this.userRepository,
            this.authedUserService,
            this.patientMetadataRepository,
            this.patientDataAccessSpecification,
            this.fileUrlService,
        );
    }
}
