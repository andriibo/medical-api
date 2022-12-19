import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccessRequestDirection} from 'domain/entities/patient-data-access.entity';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';

export class AccessForUnregisteredCaregiverService {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
        private readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async initiateDataAccess(patient: User, caregiverEmail: string): Promise<void> {
        await this.patientDataAccessSpecification.assertPatientCanGiveAccessForGrantedEmail(patient, caregiverEmail);

        const dataAccess = this.createDataAccess(patient, caregiverEmail);

        await this.patientDataAccessRepository.create(dataAccess);

        await this.patientDataAccessEventEmitter.emitPatientInitiatedAccessForUnregisteredCaregiver(
            patient,
            caregiverEmail,
        );
    }

    private createDataAccess(patient: User, grantedEmail: string): PatientDataAccess {
        const dataAccess = this.patientDataAccessEntityMapper.mapByPatientAndGrantedEmail(patient, grantedEmail);
        dataAccess.direction = PatientDataAccessRequestDirection.FromPatient;

        return dataAccess;
    }
}
