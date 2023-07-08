import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {IUserRepository} from 'app/modules/auth/repositories';
import {PatientDataAccessStatusEnum} from 'domain/constants/patient-data-access.const';

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
        if (dataAccess.status !== PatientDataAccessStatusEnum.Refused) {
            await this.sendNotification(grantedUser, dataAccess);
        }
    }

    private async sendNotification(grantedUser: User, dataAccess: PatientDataAccess): Promise<void> {
        const patientEmail = await this.getPatientEmail(dataAccess);

        if (dataAccess.status === PatientDataAccessStatusEnum.Initiated) {
            await this.patientDataAccessEventEmitter.emitAccessWithdrawnByGrantedUser(grantedUser, patientEmail);
        } else {
            await this.patientDataAccessEventEmitter.emitAccessDeletedByGrantedUser(grantedUser, patientEmail);
        }
    }

    private async getPatientEmail(dataAccess: PatientDataAccess): Promise<string> {
        if (dataAccess.patientUserId !== null) {
            const patient = await this.userRepository.getOneById(dataAccess.patientUserId);

            return patient?.email || '';
        }

        return dataAccess.patientEmail || '';
    }
}
