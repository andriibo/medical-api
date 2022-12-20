import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccessRequestDirection} from 'domain/entities/patient-data-access.entity';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';

export abstract class AccessForRegisteredUserService {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
        protected readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
        protected readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async initiateDataAccess(patient: User, grantedUser: User): Promise<void> {
        await this.assertPatientCanGiveAccessForUser(patient, grantedUser);

        const dataAccess = this.createDataAccess(patient, grantedUser);

        await this.patientDataAccessRepository.create(dataAccess);

        await this.sendNotification(patient, grantedUser.email);
    }

    protected abstract assertPatientCanGiveAccessForUser(patient: User, grantedUser: User): Promise<void>;

    protected abstract sendNotification(patient: User, email: string): Promise<void>;

    private createDataAccess(patient: User, userToGrant: User): PatientDataAccess {
        const dataAccess = this.patientDataAccessEntityMapper.mapByPatientAndGrantedUser(patient, userToGrant);
        dataAccess.direction = PatientDataAccessRequestDirection.FromPatient;

        return dataAccess;
    }
}
