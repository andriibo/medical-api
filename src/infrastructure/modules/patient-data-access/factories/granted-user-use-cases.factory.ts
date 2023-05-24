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
    ResendRequestToDataAccessUseCase,
} from 'app/modules/patient-data-access/use-cases/granted-user';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {DeleteDataAccessByGrantedUserService} from 'app/modules/patient-data-access/services/delete-data-access-by-granted-user.service';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(AccessToRegisteredPatientService)
        private readonly accessToRegisteredPatientService: AccessToRegisteredPatientService,
        @Inject(AccessToUnregisteredPatientService)
        private readonly accessToUnregisteredPatientService: AccessToUnregisteredPatientService,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(UserDtoMapper) private readonly userDtoMapper: UserDtoMapper,
        @Inject(DeleteDataAccessByGrantedUserService)
        private readonly deleteDataAccessByGrantedUserService: DeleteDataAccessByGrantedUserService,
        @Inject(IPatientDataAccessEventEmitter)
        private readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
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
            this.patientDataAccessEventEmitter,
        );
    }

    public createDataAccessListUseCase(): DataAccessListUseCase {
        return new DataAccessListUseCase(
            this.userRepository,
            this.patientDataAccessRepository,
            this.authedUserService,
            this.userDtoMapper,
        );
    }

    public createDeleteDataAccessUseCase(): DeleteDataAccessUseCase {
        return new DeleteDataAccessUseCase(
            this.patientDataAccessRepository,
            this.authedUserService,
            this.deleteDataAccessByGrantedUserService,
        );
    }

    public createResendRequestToDataAccessUseCase(): ResendRequestToDataAccessUseCase {
        return new ResendRequestToDataAccessUseCase(
            this.authedUserService,
            this.patientDataAccessRepository,
            this.patientDataAccessSpecification,
            this.patientDataAccessEventEmitter,
        );
    }
}
