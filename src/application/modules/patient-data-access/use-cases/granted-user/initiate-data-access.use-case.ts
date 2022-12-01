import {IUserRepository} from 'app/modules/auth/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AccessToRegisteredPatientService} from 'app/modules/patient-data-access/services/access-to-registered-patient.service';
import {AccessToUnregisteredPatientService} from 'app/modules/patient-data-access/services/access-to-unregistered-patient.service';

export class InitiateDataAccessUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly accessToRegisteredPatientService: AccessToRegisteredPatientService,
        private readonly accessToUnregisteredPatientService: AccessToUnregisteredPatientService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const grantedUser = await this.authedUserService.getUser();
        const patient = await this.userRepository.getOneByEmail(dto.email);

        if (patient === null) {
            await this.accessToUnregisteredPatientService.initiateDataAccess(grantedUser, dto.email);
        } else {
            await this.accessToRegisteredPatientService.initiateDataAccess(grantedUser, patient);
        }
    }
}
