import {IUserRepository} from 'app/modules/auth/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AccessToRegisteredDoctorService} from 'app/modules/patient-data-access/services/access-to-registered-doctor.service';
import {AccessToUnregisteredPatientService} from 'app/modules/patient-data-access/services/access-to-unregistered-patient.service';

export class InitiateDataAccessUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly accessToRegisteredDoctorService: AccessToRegisteredDoctorService,
        private readonly accessToUnregisteredPatientService: AccessToUnregisteredPatientService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const userToGrant = await this.userRepository.getOneByEmail(dto.email);

        if (userToGrant === null) {
            await this.accessToUnregisteredPatientService.initiateDataAccess(patient, dto.email);
        } else {
            await this.accessToRegisteredDoctorService.initiateDataAccess(patient, userToGrant);
        }
    }
}
