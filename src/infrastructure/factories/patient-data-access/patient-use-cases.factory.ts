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
import {AccessForRegisteredUserService} from 'app/modules/patient-data-access/services/access-for-registered-user.service';
import {AccessForUnregisteredUserService} from 'app/modules/patient-data-access/services/access-for-unregistered-user.service';
import {DeletePatientDataAccessForDoctorService} from 'app/modules/patient-data-access/services/delete-patient-data-access-for-doctor.service';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(AccessForRegisteredUserService)
        private readonly accessForRegisteredUserService: AccessForRegisteredUserService,
        @Inject(AccessForUnregisteredUserService)
        private readonly accessForUnregisteredUserService: AccessForUnregisteredUserService,
        @Inject(DeletePatientDataAccessForDoctorService)
        private readonly deletePatientDataAccessForDoctorService: DeletePatientDataAccessForDoctorService,
    ) {}

    public createInitiateDataAccessUseCase(): InitiateDataAccessUseCase {
        return new InitiateDataAccessUseCase(
            this.userRepository,
            this.authedUserService,
            this.accessForRegisteredUserService,
            this.accessForUnregisteredUserService,
        );
    }

    public createDataAccessListUseCase(): DataAccessListUseCase {
        return new DataAccessListUseCase(this.userRepository, this.patientDataAccessRepository, this.authedUserService);
    }

    public createDeleteDataAccessUseCase(): DeleteDataAccessUseCase {
        return new DeleteDataAccessUseCase(
            this.patientDataAccessRepository,
            this.authedUserService,
            this.deletePatientDataAccessForDoctorService,
        );
    }
}
