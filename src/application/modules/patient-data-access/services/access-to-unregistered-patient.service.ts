import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccessRequestDirectionEnum} from 'domain/constants/patient-data-access.const';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';

export class AccessToUnregisteredPatientService {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
        private readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async initiateDataAccess(grantedUser: User, patientEmail: string): Promise<void> {
        await this.patientDataAccessSpecification.assertGrantedUserCanGetAccessToUnregisteredPatient(
            grantedUser,
            patientEmail,
        );

        const dataAccess = this.createDataAccess(grantedUser, patientEmail);

        await this.patientDataAccessRepository.create(dataAccess);

        await this.patientDataAccessEventEmitter.emitGrantedUserInitiatedAccessToUnregisteredPatient(
            grantedUser,
            patientEmail,
        );
    }

    private createDataAccess(grantedUser: User, patientEmail: string): PatientDataAccess {
        const dataAccess = this.patientDataAccessEntityMapper.mapByGrantedUserAndPatientEmail(
            grantedUser,
            patientEmail,
        );
        dataAccess.direction = PatientDataAccessRequestDirectionEnum.ToPatient;

        return dataAccess;
    }
}
