import {IUserRepository} from 'app/modules/auth/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AccessForRegisteredGrantedUserService} from 'app/modules/patient-data-access/services/access-for-registered-granted-user.service';
import {AccessForUnregisteredGrantedUserService} from 'app/modules/patient-data-access/services/access-for-unregistered-granted-user.service';

export class InitiateDataAccessUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly accessForRegisteredGrantedUserService: AccessForRegisteredGrantedUserService,
        private readonly accessForUnregisteredGrantedUserService: AccessForUnregisteredGrantedUserService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const userToGrant = await this.userRepository.getOneByEmail(dto.email);

        if (userToGrant === null) {
            await this.accessForUnregisteredGrantedUserService.initiateDataAccess(patient, dto.email);
        } else {
            await this.accessForRegisteredGrantedUserService.initiateDataAccess(patient, userToGrant);
        }
    }
}
