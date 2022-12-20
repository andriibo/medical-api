import {IUserRepository} from 'app/modules/auth/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AccessForRegisteredCaregiverService} from 'app/modules/patient-data-access/services/access-for-registered-caregiver.service';
import {AccessForUnregisteredCaregiverService} from 'app/modules/patient-data-access/services/access-for-unregistered-caregiver.service';

export class InitiateDataAccessForCaregiverUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly accessForRegisteredCaregiverService: AccessForRegisteredCaregiverService,
        private readonly accessForUnregisteredCaregiverService: AccessForUnregisteredCaregiverService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const caregiver = await this.userRepository.getOneByEmail(dto.email);

        if (caregiver === null) {
            await this.accessForUnregisteredCaregiverService.initiateDataAccess(patient, dto.email);
        } else {
            await this.accessForRegisteredCaregiverService.initiateDataAccess(patient, caregiver);
        }
    }
}
