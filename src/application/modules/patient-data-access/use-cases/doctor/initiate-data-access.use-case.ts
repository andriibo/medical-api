import {IUserRepository} from 'app/modules/auth/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AccessToRegisteredPatientService} from 'app/modules/patient-data-access/services/access-to-registered-patient.service';

export class InitiateDataAccessUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly accessToRegisteredPatientService: AccessToRegisteredPatientService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const doctor = await this.authedUserService.getUser();
        const userToGrant = await this.userRepository.getOneByEmail(dto.email);

        if (userToGrant === null) {
            throw new Error('Unregistered user.');
        }

        await this.accessToRegisteredPatientService.initiateDataAccess(doctor, userToGrant);
    }
}
