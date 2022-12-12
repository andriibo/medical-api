import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {IUserRepository} from 'app/modules/auth/repositories';
import {EntityNotFoundError} from 'app/errors';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';

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
        if (dataAccess.status === PatientDataAccessStatus.Approved) {
            const patient = await this.getPatient(dataAccess.patientUserId);
            await this.patientDataAccessEventEmitter.emitAccessDeletedByGrantedUser(grantedUser, patient.email);
        }
    }

    private async getPatient(patientUserId: string): Promise<User> {
        const patient = await this.userRepository.getOneById(patientUserId);

        if (patient === null) {
            throw new EntityNotFoundError('Patient Not Found.');
        }

        return patient;
    }
}
