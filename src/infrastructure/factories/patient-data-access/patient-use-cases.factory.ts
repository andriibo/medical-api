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
import {DeleteDataAccessByPatientService} from 'app/modules/patient-data-access/services/delete-data-access-by-patient.service';
import {AccessForUnregisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-unregistered-doctor.service';
import {AccessForRegisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-registered-doctor.service';

@Injectable()
export class PatientUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(AccessForRegisteredDoctorService)
        private readonly accessForRegisteredDoctorService: AccessForRegisteredDoctorService,
        @Inject(AccessForUnregisteredDoctorService)
        private readonly accessForUnregisteredDoctorService: AccessForUnregisteredDoctorService,
        @Inject(DeleteDataAccessByPatientService)
        private readonly deleteDataAccessByPatientService: DeleteDataAccessByPatientService,
    ) {}

    public createInitiateDataAccessUseCase(): InitiateDataAccessUseCase {
        return new InitiateDataAccessUseCase(
            this.userRepository,
            this.authedUserService,
            this.accessForRegisteredDoctorService,
            this.accessForUnregisteredDoctorService,
        );
    }

    public createDataAccessListUseCase(): DataAccessListUseCase {
        return new DataAccessListUseCase(this.userRepository, this.patientDataAccessRepository, this.authedUserService);
    }

    public createDeleteDataAccessUseCase(): DeleteDataAccessUseCase {
        return new DeleteDataAccessUseCase(
            this.patientDataAccessRepository,
            this.authedUserService,
            this.deleteDataAccessByPatientService,
        );
    }
}
