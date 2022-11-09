import {IUserRepository} from 'app/modules/auth/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AccessToUnregisteredPatientService} from 'app/modules/patient-data-access/services/access-to-unregistered-patient.service';
import {AccessForRegisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-registered-doctor.service';

export class InitiateDataAccessUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly accessForRegisteredDoctorService: AccessForRegisteredDoctorService,
        private readonly accessToUnregisteredPatientService: AccessToUnregisteredPatientService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const userToGrant = await this.userRepository.getOneByEmail(dto.email);

        if (userToGrant === null) {
            await this.accessToUnregisteredPatientService.initiateDataAccess(patient, dto.email);
        } else {
            await this.accessForRegisteredDoctorService.initiateDataAccess(patient, userToGrant);
        }
    }
}
