import {IUserRepository} from 'app/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {AccessForRegisteredUserService} from 'app/services/access-for-registered-user.service';
import {AccessForUnregisteredUserService} from 'app/services/access-for-unregistered-user.service';

export class InitiateDataAccessUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly accessForRegisteredUserService: AccessForRegisteredUserService,
        private readonly accessForUnregisteredUserService: AccessForUnregisteredUserService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const userToGrant = await this.userRepository.getOneByEmail(dto.email);

        if (userToGrant === null) {
            await this.accessForUnregisteredUserService.initiateDataAccess(patient, dto.email);
        } else {
            await this.accessForRegisteredUserService.initiateDataAccess(patient, userToGrant);
        }
    }
}
