import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {
    InitiateDataAccessUseCase,
    DataAccessListUseCase,
    DeleteDataAccessUseCase,
} from 'app/modules/patient-data-access/use-cases/patient';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {ApproveDataAccessUseCase} from 'app/modules/patient-data-access/use-cases/patient/approve-data-access.use-case';
import {DeleteDataAccessByPatientService} from 'app/modules/patient-data-access/services/delete-data-access-by-patient.service';
import {AccessForUnregisteredGrantedUserService} from 'app/modules/patient-data-access/services/access-for-unregistered-granted-user.service';
import {AccessForRegisteredGrantedUserService} from 'app/modules/patient-data-access/services/access-for-registered-granted-user.service';
import {RefuseDataAccessUseCase} from 'app/modules/patient-data-access/use-cases/patient/refuse-data-access.use-case';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(AccessForRegisteredGrantedUserService)
        private readonly accessForRegisteredGrantedUserService: AccessForRegisteredGrantedUserService,
        @Inject(AccessForUnregisteredGrantedUserService)
        private readonly accessForUnregisteredGrantedUserService: AccessForUnregisteredGrantedUserService,
        @Inject(DeleteDataAccessByPatientService)
        private readonly deleteDataAccessByPatientService: DeleteDataAccessByPatientService,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
    ) {}

    public createInitiateDataAccessUseCase(): InitiateDataAccessUseCase {
        return new InitiateDataAccessUseCase(
            this.userRepository,
            this.authedUserService,
            this.accessForRegisteredGrantedUserService,
            this.accessForUnregisteredGrantedUserService,
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
            this.deleteDataAccessByPatientService,
        );
    }
}
