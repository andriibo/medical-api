import {Inject, Injectable} from '@nestjs/common';
import {PatientContactListUseCase} from 'app/modules/emergency-contact/use-cases/doctor';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

@Injectable()
export class DoctorUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IEmergencyContactRepository)
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public createPatientContactUseCase(): PatientContactListUseCase {
        return new PatientContactListUseCase(
            this.userRepository,
            this.authedUserService,
            this.emergencyContactRepository,
            this.patientDataAccessSpecification,
        );
    }
}
