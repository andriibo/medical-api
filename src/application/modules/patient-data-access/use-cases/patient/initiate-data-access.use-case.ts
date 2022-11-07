import {IUserRepository} from 'app/modules/auth/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AccessForRegisteredUserByPatientService} from 'app/modules/patient-data-access/services/access-for-registered-user-by-patient.service';
import {AccessForUnregisteredUserByPatientService} from 'app/modules/patient-data-access/services/access-for-unregistered-user-by-patient.service';

export class InitiateDataAccessUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly accessForRegisteredUserByPatientService: AccessForRegisteredUserByPatientService,
        private readonly accessForUnregisteredUserByPatientService: AccessForUnregisteredUserByPatientService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const userToGrant = await this.userRepository.getOneByEmail(dto.email);

        if (userToGrant === null) {
            await this.accessForUnregisteredUserByPatientService.initiateDataAccess(patient, dto.email);
        } else {
            await this.accessForRegisteredUserByPatientService.initiateDataAccess(patient, userToGrant);
        }
    }
}
