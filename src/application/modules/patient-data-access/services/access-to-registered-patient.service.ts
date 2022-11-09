import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccessRequestDirection} from 'domain/entities/patient-data-access.entity';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';

export class AccessToRegisteredPatientService {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
        private readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async initiateDataAccess(patient: User, userToGrant: User): Promise<void> {
        await this.patientDataAccessSpecification.assertPatientCanGiveAccessForUser(patient, userToGrant);

        const dataAccess = this.createDataAccess(patient, userToGrant);

        await this.patientDataAccessRepository.create(dataAccess);

        await this.patientDataAccessEventEmitter.emitDoctorInitiatedAccessToRegisteredPatient(
            patient,
            userToGrant.email,
        );
    }

    private createDataAccess(patient: User, userToGrant: User): PatientDataAccess {
        const dataAccess = this.patientDataAccessEntityMapper.mapByPatientAndGrantedUser(patient, userToGrant);
        dataAccess.direction = PatientDataAccessRequestDirection.ToPatient;

        return dataAccess;
    }
}
