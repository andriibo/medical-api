import {IUserRepository} from 'app/modules/auth/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AccessForRegisteredUserService} from 'app/modules/patient-data-access/services/access-for-registered-user.service';
import {AccessForUnregisteredUserService} from 'app/modules/patient-data-access/services/access-for-unregistered-user.service';

export class InitiateDataAccessUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly accessForRegisteredUserService: AccessForRegisteredUserService,
        private readonly accessForUnregisteredUserService: AccessForUnregisteredUserService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const grantedUser = await this.userRepository.getOneByEmail(dto.email);

        if (grantedUser === null) {
            await this.accessForUnregisteredUserService.initiateDataAccess(patient, dto.email);
        } else {
            await this.accessForRegisteredUserService.initiateDataAccess(patient, grantedUser);
        }
    }
}
