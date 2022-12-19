import {IUserRepository} from 'app/modules/auth/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/request/data-access/initiate-data-access.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AccessForRegisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-registered-doctor.service';
import {AccessForUnregisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-unregistered-doctor.service';

export class InitiateDoctorDataAccessUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly accessForRegisteredDoctorService: AccessForRegisteredDoctorService,
        private readonly accessForUnregisteredDoctorService: AccessForUnregisteredDoctorService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const doctor = await this.userRepository.getOneByEmail(dto.email);

        if (doctor === null) {
            await this.accessForUnregisteredDoctorService.initiateDataAccess(patient, dto.email);
        } else {
            await this.accessForRegisteredDoctorService.initiateDataAccess(patient, doctor);
        }
    }
}
