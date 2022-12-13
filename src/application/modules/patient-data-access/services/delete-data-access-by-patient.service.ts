import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {IUserRepository} from 'app/modules/auth/repositories';

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
        await this.sendNotificationIfGrantedUserRegistered(patient, dataAccess);
    }

    private async sendNotificationIfGrantedUserRegistered(patient: User, dataAccess: PatientDataAccess): Promise<void> {
        if (dataAccess.grantedUserId !== null) {
            const grantedUser = await this.userRepository.getOneByIdOrFail(dataAccess.grantedUserId);
            await this.patientDataAccessEventEmitter.emitAccessDeletedByPatient(patient, grantedUser.email);
        }
    }
}
