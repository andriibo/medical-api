import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {IUserRepository} from 'app/modules/auth/repositories';
import {EntityNotFoundError} from 'app/errors';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';

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
        if (dataAccess.status === PatientDataAccessStatus.Approved) {
            const grantedUser = await this.getGrantedUser(dataAccess.grantedUserId);
            await this.patientDataAccessEventEmitter.emitAccessDeletedByPatient(patient, grantedUser.email);
        }
    }

    private async getGrantedUser(grantedUserId: string): Promise<User> {
        const patient = await this.userRepository.getOneById(grantedUserId);

        if (patient === null) {
            throw new EntityNotFoundError('Granted User Not Found.');
        }

        return patient;
    }
}
