import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {AccessToRegisteredPatientService} from 'app/modules/patient-data-access/services/access-to-registered-patient.service';
import {AccessToUnregisteredPatientService} from 'app/modules/patient-data-access/services/access-to-unregistered-patient.service';
import {
    InitiateDataAccessUseCase,
    RefuseDataAccessUseCase,
} from 'app/modules/patient-data-access/use-cases/granted-user';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';

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
}
