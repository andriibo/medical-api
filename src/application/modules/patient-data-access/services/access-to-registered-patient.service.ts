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

    public async initiateDataAccess(doctor: User, patient: User): Promise<void> {
        await this.patientDataAccessSpecification.assertUserCanGiveAccessToPatient(doctor, patient);

        const dataAccess = this.createDataAccess(doctor, patient);

        await this.patientDataAccessRepository.create(dataAccess);

        await this.patientDataAccessEventEmitter.emitDoctorInitiatedAccessToRegisteredPatient(doctor, patient.email);
    }

    private createDataAccess(doctor: User, patient: User): PatientDataAccess {
        const dataAccess = this.patientDataAccessEntityMapper.mapByPatientAndGrantedUser(patient, doctor);
        dataAccess.direction = PatientDataAccessRequestDirection.ToPatient;

        return dataAccess;
    }
}
