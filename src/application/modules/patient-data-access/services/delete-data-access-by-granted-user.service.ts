import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {IUserRepository} from 'app/modules/auth/repositories';

export class DeleteDataAccessByGrantedUserService {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
    ) {}

    public async deleteDataAccess(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        await this.patientDataAccessSpecification.assertGrantedUserCanDeleteAccess(grantedUser, dataAccess);
        await this.patientDataAccessRepository.delete(dataAccess);
        await this.sendNotificationToPatient(grantedUser, dataAccess);
    }

    private async sendNotificationToPatient(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        let patientEmail = dataAccess.patientEmail;
        if (dataAccess.patientUserId !== null) {
            const patient = await this.userRepository.getOneByIdOrFail(dataAccess.patientUserId);
            patientEmail = patient.email;
        }

        await this.patientDataAccessEventEmitter.emitAccessDeletedByGrantedUser(grantedUser, patientEmail);
    }
}
