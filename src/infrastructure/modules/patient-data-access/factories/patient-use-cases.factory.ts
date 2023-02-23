import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {
    DataAccessListUseCase,
    DeleteDataAccessUseCase,
    InitiateDataAccessUseCase,
} from 'app/modules/patient-data-access/use-cases/patient';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {ApproveDataAccessUseCase} from 'app/modules/patient-data-access/use-cases/patient/approve-data-access.use-case';
import {DeleteDataAccessByPatientService} from 'app/modules/patient-data-access/services/delete-data-access-by-patient.service';
import {AccessForUnregisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-unregistered-doctor.service';
import {AccessForRegisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-registered-doctor.service';
import {RefuseDataAccessUseCase} from 'app/modules/patient-data-access/use-cases/patient/refuse-data-access.use-case';
import {AccessForRegisteredCaregiverService} from 'app/modules/patient-data-access/services/access-for-registered-caregiver.service';
import {AccessForUnregisteredCaregiverService} from 'app/modules/patient-data-access/services/access-for-unregistered-caregiver.service';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';

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
        @Inject(AccessForRegisteredCaregiverService)
        private readonly accessForRegisteredCaregiverService: AccessForRegisteredCaregiverService,
        @Inject(AccessForUnregisteredDoctorService)
        private readonly accessForUnregisteredDoctorService: AccessForUnregisteredDoctorService,
        @Inject(AccessForUnregisteredCaregiverService)
        private readonly accessForUnregisteredCaregiverService: AccessForUnregisteredCaregiverService,
        @Inject(DeleteDataAccessByPatientService)
        private readonly deleteDataAccessByPatientService: DeleteDataAccessByPatientService,
        @Inject(UserDtoService) private readonly userDtoService: UserDtoService,
        @Inject(IPatientDataAccessEventEmitter)
        private readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
    ) {}

    public createInitiateDataAccessForDoctorUseCase(): InitiateDataAccessUseCase {
        return new InitiateDataAccessUseCase(
            this.userRepository,
            this.authedUserService,
            this.accessForRegisteredDoctorService,
            this.accessForUnregisteredDoctorService,
        );
    }

    public createInitiateDataAccessForCaregiverUseCase(): InitiateDataAccessUseCase {
        return new InitiateDataAccessUseCase(
            this.userRepository,
            this.authedUserService,
            this.accessForRegisteredCaregiverService,
            this.accessForUnregisteredCaregiverService,
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
            this.patientDataAccessEventEmitter,
        );
    }

    public createDataAccessListUseCase(): DataAccessListUseCase {
        return new DataAccessListUseCase(this.patientDataAccessRepository, this.authedUserService, this.userDtoService);
    }

    public createDeleteDataAccessUseCase(): DeleteDataAccessUseCase {
        return new DeleteDataAccessUseCase(
            this.patientDataAccessRepository,
            this.authedUserService,
            this.deleteDataAccessByPatientService,
        );
    }
}
