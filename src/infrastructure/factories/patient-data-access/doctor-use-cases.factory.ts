import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {
    ApproveDataAccessUseCase,
    DataAccessListUseCase,
    DeleteDataAccessUseCase,
    RefuseDataAccessUseCase,
} from 'app/modules/patient-data-access/use-cases/doctor';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {DeleteDataAccessByDoctorService} from 'app/modules/patient-data-access/services/delete-data-access-by-doctor.service';
import {InitiateDataAccessUseCase} from 'app/modules/patient-data-access/use-cases/doctor/initiate-data-access.use-case';
import {AccessForRegisteredUserByDoctorService} from 'app/modules/patient-data-access/services/access-for-registered-user-by-doctor.service';
import {AccessForUnregisteredUserByDoctorService} from 'app/modules/patient-data-access/services/access-for-unregistered-user-by-doctor.service';

@Injectable()
export class DoctorUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(DeleteDataAccessByDoctorService)
        private readonly deleteDataAccessByDoctorService: DeleteDataAccessByDoctorService,
        @Inject(AccessForRegisteredUserByDoctorService)
        private readonly accessForRegisteredUserByDoctorService: AccessForRegisteredUserByDoctorService,
        @Inject(AccessForUnregisteredUserByDoctorService)
        private readonly accessForUnregisteredUserByDoctorService: AccessForUnregisteredUserByDoctorService,
    ) {}

    public createInitiateDataAccessUseCase(): InitiateDataAccessUseCase {
        return new InitiateDataAccessUseCase(
            this.userRepository,
            this.authedUserService,
            this.accessForRegisteredUserByDoctorService,
            this.accessForUnregisteredUserByDoctorService,
        );
    }

    public createDataAccessListUseCase(): DataAccessListUseCase {
        return new DataAccessListUseCase(this.userRepository, this.patientDataAccessRepository, this.authedUserService);
    }

    public createRefuseDataAccessUseCase(): RefuseDataAccessUseCase {
        return new RefuseDataAccessUseCase(
            this.userRepository,
            this.patientDataAccessRepository,
            this.authedUserService,
            this.patientDataAccessSpecification,
        );
    }

    public createApproveDataAccessUseCase(): ApproveDataAccessUseCase {
        return new ApproveDataAccessUseCase(
            this.userRepository,
            this.patientDataAccessRepository,
            this.authedUserService,
            this.patientDataAccessSpecification,
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
