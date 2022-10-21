import {PatientDataAccess, User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/repositories';
import {IPatientDataAccessEntityMapper} from 'app/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';
import {PatientDataAccessRequestDirection} from 'domain/entities/patient-data-access.entity';

export class AccessForRegisteredUserService {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async initiateDataAccess(patient: User, userToGrant: User): Promise<void> {
        await this.patientDataAccessSpecification.assertPatientCanGiveAccessForUser(patient, userToGrant);

        const dataAccess = this.createDataAccess(patient, userToGrant);

        await this.patientDataAccessRepository.create(dataAccess);
    }

    private createDataAccess(patient: User, userToGrant: User): PatientDataAccess {
        const dataAccess = this.patientDataAccessEntityMapper.mapByPatientAndGrantedUser(patient, userToGrant);
        dataAccess.direction = PatientDataAccessRequestDirection.FromPatient;

        return dataAccess;
    }
}
