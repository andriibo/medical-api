import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {IUserRepository} from 'app/modules/auth/repositories';
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
        if (dataAccess.status !== PatientDataAccessStatus.Refused) {
            await this.sendNotification(patient, dataAccess);
        }
    }

    private async sendNotification(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        if (dataAccess.status === PatientDataAccessStatus.Initiated) {
            await this.sendAccessWithdrawnNotification(patient, dataAccess);
        } else {
            await this.sendAccessDeletedNotification(patient, dataAccess);
        }
    }

    private async sendAccessWithdrawnNotification(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        const grantedEmail = await this.getGrantedEmail(dataAccess);

        await this.patientDataAccessEventEmitter.emitAccessWithdrawnByPatient(patient, grantedEmail);
    }

    private async sendAccessDeletedNotification(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        const grantedUser = await this.getGrantedUser(dataAccess);

        if (grantedUser !== null) {
            await this.patientDataAccessEventEmitter.emitAccessDeletedByPatient(patient, grantedUser);
        }
    }

    private async getGrantedEmail(dataAccess: PatientDataAccess): Promise<string> {
        if (dataAccess.grantedUserId !== null) {
            const grantedUser = await this.getGrantedUser(dataAccess);

            return grantedUser?.email || '';
        }

        return dataAccess.grantedEmail || '';
    }

    private async getGrantedUser(dataAccess: PatientDataAccess): Promise<User | null> {
        if (dataAccess.grantedUserId !== null) {
            return await this.userRepository.getOneById(dataAccess.grantedUserId);
        }

        return null;
    }
}
