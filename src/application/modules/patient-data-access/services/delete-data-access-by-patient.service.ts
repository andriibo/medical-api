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
        const grantedEmail = await this.getGrantedEmail(dataAccess);

        if (dataAccess.status === PatientDataAccessStatus.Initiated) {
            await this.patientDataAccessEventEmitter.emitAccessWithdrawnByPatient(patient, grantedEmail);
        } else {
            await this.patientDataAccessEventEmitter.emitAccessDeletedByPatient(patient, grantedEmail);
        }
    }

    private async getGrantedEmail(dataAccess: PatientDataAccess): Promise<string> {
        if (dataAccess.grantedUserId !== null) {
            const grantedUser = await this.userRepository.getOneByIdOrFail(dataAccess.grantedUserId);

            return grantedUser.email;
        }

        return dataAccess.grantedEmail;
    }
}
