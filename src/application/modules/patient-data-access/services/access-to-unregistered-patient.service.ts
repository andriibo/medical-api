import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccessRequestDirection} from 'domain/entities/patient-data-access.entity';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';

export class AccessToUnregisteredPatientService {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
        private readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async initiateDataAccess(doctor: User, patientEmail: string): Promise<void> {
        await this.patientDataAccessSpecification.assertUserCanGiveAccessToPatientEmail(doctor, patientEmail);

        const dataAccess = this.createDataAccess(doctor, patientEmail);

        await this.patientDataAccessRepository.create(dataAccess);

        await this.patientDataAccessEventEmitter.emitDoctorInitiatedAccessToUnregisteredPatient(doctor, patientEmail);
    }

    private createDataAccess(doctor: User, patientEmail: string): PatientDataAccess {
        const dataAccess = this.patientDataAccessEntityMapper.mapByGrantedUserAndPatientEmail(doctor, patientEmail);
        dataAccess.direction = PatientDataAccessRequestDirection.ToPatient;

        return dataAccess;
    }
}
