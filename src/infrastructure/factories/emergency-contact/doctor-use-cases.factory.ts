import {Inject, Injectable} from '@nestjs/common';
import {PatientContactListUseCase} from 'app/use-cases/emergency-contact/doctor';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {IEmergencyContactRepository, IPatientDataAccessRepository, IUserRepository} from 'app/repositories';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';

@Injectable()
export class DoctorUseCasesFactory {
    constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IEmergencyContactRepository)
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
    ) {}

    public createPatientContactUseCase(): PatientContactListUseCase {
        const patientDataAccessSpecification = new PatientDataAccessSpecification(this.patientDataAccessRepository);

        return new PatientContactListUseCase(
            this.userRepository,
            this.authedUserService,
            this.emergencyContactRepository,
            patientDataAccessSpecification,
        );
    }
}
