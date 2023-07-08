import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccessRequestDirectionEnum} from 'domain/constants/patient-data-access.const';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';

export abstract class AccessForUnregisteredUserService {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
        protected readonly patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async initiateDataAccess(patient: User, email: string): Promise<void> {
        await this.patientDataAccessSpecification.assertPatientCanGiveAccessForGrantedEmail(patient, email);

        const dataAccess = this.createDataAccess(patient, email);

        await this.patientDataAccessRepository.create(dataAccess);

        await this.sendNotification(patient, email);
    }

    protected abstract sendNotification(patient: User, email: string): Promise<void>;

    private createDataAccess(patient: User, grantedEmail: string): PatientDataAccess {
        const dataAccess = this.patientDataAccessEntityMapper.mapByPatientAndGrantedEmail(patient, grantedEmail);
        dataAccess.direction = PatientDataAccessRequestDirectionEnum.FromPatient;

        return dataAccess;
    }
}
