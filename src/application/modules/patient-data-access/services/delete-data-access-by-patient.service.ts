import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {IUserRepository} from 'app/modules/auth/repositories';
import {EntityNotFoundError} from 'app/errors';

export class DeleteDataAccessByPatientService {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
    ) {}

    public async deleteDataAccess(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        await this.patientDataAccessSpecification.assertPatientCanDeleteAccess(patient, dataAccess);
        await this.patientDataAccessRepository.delete(dataAccess);
        await this.sendNotificationToGrantedUser(patient, dataAccess);
    }

    private async sendNotificationToGrantedUser(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        let grantedEmail = dataAccess.grantedEmail;
        if (dataAccess.grantedUserId !== null) {
            const grantedUser = await this.getGrantedUser(dataAccess.grantedUserId);
            grantedEmail = grantedUser.email;
        }

        await this.patientDataAccessEventEmitter.emitAccessDeletedByPatient(patient, grantedEmail);
    }

    private async getGrantedUser(grantedUserId: string): Promise<User> {
        const patient = await this.userRepository.getOneById(grantedUserId);

        if (patient === null) {
            throw new EntityNotFoundError('Granted User Not Found.');
        }

        return patient;
    }
}
