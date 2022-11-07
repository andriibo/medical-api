import {IUserRepository} from 'app/modules/auth/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AccessForRegisteredUserByDoctorService} from 'app/modules/patient-data-access/services/access-for-registered-user-by-doctor.service';
import {AccessForUnregisteredUserByDoctorService} from 'app/modules/patient-data-access/services/access-for-unregistered-user-by-doctor.service';

export class InitiateDataAccessUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly accessForRegisteredUserByDoctorService: AccessForRegisteredUserByDoctorService,
        private readonly accessForUnregisteredUserByDoctorService: AccessForUnregisteredUserByDoctorService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const doctor = await this.authedUserService.getUser();
        const userToGrant = await this.userRepository.getOneByEmail(dto.email);

        if (userToGrant === null) {
            await this.accessForUnregisteredUserByDoctorService.initiateDataAccess(doctor, dto.email);
        } else {
            await this.accessForRegisteredUserByDoctorService.initiateDataAccess(doctor, userToGrant);
        }
    }
}
