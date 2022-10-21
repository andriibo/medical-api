import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/repositories';
import {IPatientDataAccessEntityMapper} from 'app/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';
import {PatientDataAccessRequestDirection} from 'domain/entities/patient-data-access.entity';
import {IPatientDataAccessEventEmitter} from 'app/event-emitters/patient-data-access.event-emitter';

export class AccessForUnregisteredUserService {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
        private readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async initiateDataAccess(patient: User, email: string): Promise<void> {
        await this.patientDataAccessSpecification.assertPatientCanGiveAccessForEmail(patient, email);

        const dataAccess = this.createDataAccess(patient, email);

        await this.patientDataAccessRepository.create(dataAccess);

        await this.patientDataAccessEventEmitter.emitAccessForUnregisteredUserInitiated(dataAccess);
    }

    private createDataAccess(patient: User, email: string): PatientDataAccess {
        const dataAccess = this.patientDataAccessEntityMapper.mapByPatientAndGrantedEmail(patient, email);
        dataAccess.direction = PatientDataAccessRequestDirection.FromPatient;

        return dataAccess;
    }
}
