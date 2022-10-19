import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {
    ApproveDataAccessUseCase,
    DataAccessListUseCase,
    DeleteDataAccessUseCase,
    RefuseDataAccessUseCase,
} from 'app/use-cases/patient-data-access/doctor';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';

@Injectable()
export class DoctorUseCasesFactory {
    constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

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
            this.userRepository,
            this.patientDataAccessRepository,
            this.authedUserService,
            this.patientDataAccessSpecification,
        );
    }
}
