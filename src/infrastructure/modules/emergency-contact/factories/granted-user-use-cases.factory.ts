import {Inject, Injectable} from '@nestjs/common';
import {PatientContactListUseCase} from 'app/modules/emergency-contact/use-cases/granted-user';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

@Injectable()
export class GrantedUserUseCasesFactory {
    public constructor(
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IEmergencyContactRepository)
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public createPatientContactUseCase(): PatientContactListUseCase {
        return new PatientContactListUseCase(
            this.authedUserService,
            this.emergencyContactRepository,
            this.patientDataAccessSpecification,
        );
    }
}
