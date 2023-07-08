import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccessRequestDirectionEnum} from 'domain/constants/patient-data-access.const';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';

export class AccessToRegisteredPatientService {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
        private readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async initiateDataAccess(grantedUser: User, patient: User): Promise<void> {
        await this.patientDataAccessSpecification.assertGrantedUserCanGetAccessToPatient(grantedUser, patient);

        const dataAccess = this.createDataAccess(grantedUser, patient);

        await this.patientDataAccessRepository.create(dataAccess);

        await this.patientDataAccessEventEmitter.emitGrantedUserInitiatedAccessToRegisteredPatient(
            grantedUser,
            patient.email,
        );
    }

    private createDataAccess(grantedUser: User, patient: User): PatientDataAccess {
        const dataAccess = this.patientDataAccessEntityMapper.mapByPatientAndGrantedUser(patient, grantedUser);
        dataAccess.direction = PatientDataAccessRequestDirectionEnum.ToPatient;

        return dataAccess;
    }
}
