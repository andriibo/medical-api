import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {AccessToRegisteredPatientService} from 'app/modules/patient-data-access/services/access-to-registered-patient.service';
import {AccessToUnregisteredPatientService} from 'app/modules/patient-data-access/services/access-to-unregistered-patient.service';
import {
    ApproveDataAccessUseCase,
    DataAccessListUseCase,
    DeleteDataAccessUseCase,
    InitiateDataAccessUseCase,
    RefuseDataAccessUseCase,
} from 'app/modules/patient-data-access/use-cases/granted-user';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {DeleteDataAccessByDoctorService} from 'app/modules/patient-data-access/services/delete-data-access-by-doctor.service';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(PatientDataAccessSpecification)
        private readonly accessToRegisteredPatientService: AccessToRegisteredPatientService,
        @Inject(AccessToUnregisteredPatientService)
        private readonly accessToUnregisteredPatientService: AccessToUnregisteredPatientService,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
        @Inject(PatientDataAccessSpecification)
        private readonly deleteDataAccessByDoctorService: DeleteDataAccessByDoctorService,
    ) {}

    public createInitiateDataAccessUseCase(): InitiateDataAccessUseCase {
        return new InitiateDataAccessUseCase(
            this.userRepository,
            this.authedUserService,
            this.accessToRegisteredPatientService,
            this.accessToUnregisteredPatientService,
        );
    }

    public createRefuseDataAccessUseCase(): RefuseDataAccessUseCase {
        return new RefuseDataAccessUseCase(
            this.patientDataAccessRepository,
            this.authedUserService,
            this.patientDataAccessSpecification,
        );
    }

    public createApproveDataAccessUseCase(): ApproveDataAccessUseCase {
        return new ApproveDataAccessUseCase(
            this.patientDataAccessRepository,
            this.authedUserService,
            this.patientDataAccessSpecification,
        );
    }

    public createDataAccessListUseCase(): DataAccessListUseCase {
        return new DataAccessListUseCase(
            this.userRepository,
            this.patientDataAccessRepository,
            this.authedUserService,
            this.fileUrlService,
        );
    }

    public createDeleteDataAccessUseCase(): DeleteDataAccessUseCase {
        return new DeleteDataAccessUseCase(
            this.patientDataAccessRepository,
            this.authedUserService,
            this.deleteDataAccessByDoctorService,
        );
    }
}
