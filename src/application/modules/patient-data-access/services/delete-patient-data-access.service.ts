import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IDoctorDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/doctor-data-access.event-emitter';

export class DeletePatientDataAccessService {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly doctorDataAccessEventEmitter: IDoctorDataAccessEventEmitter,
    ) {}

    public async deleteDataAccess(user: User, dataAccess: PatientDataAccess): Promise<void> {
        await this.patientDataAccessSpecification.assertGrantedUserCanDeleteAccess(user, dataAccess);

        await this.patientDataAccessRepository.delete(dataAccess);

        await this.doctorDataAccessEventEmitter.emitAccessForPatientDeleted(user, dataAccess.grantedEmail);
    }
}
