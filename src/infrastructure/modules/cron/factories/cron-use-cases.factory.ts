import {Inject, Injectable} from '@nestjs/common';
import {RemoveUsersUseCase} from 'app/modules/profile/use-cases/profile';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IRemoveCaregiverOrPatientService} from 'app/modules/profile/services/remove-caregiver-or-patient.service';
import {IRemoveDoctorService} from 'app/modules/profile/services/remove-doctor.service';

@Injectable()
export class CronUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IRemoveCaregiverOrPatientService)
        private readonly removeCaregiverOrPatientService: IRemoveCaregiverOrPatientService,
        @Inject(IRemoveDoctorService) private readonly removeDoctorService: IRemoveDoctorService,
    ) {}

    public createRemoveUsersUseCase(): RemoveUsersUseCase {
        return new RemoveUsersUseCase(
            this.userRepository,
            this.removeCaregiverOrPatientService,
            this.removeDoctorService,
        );
    }
}
