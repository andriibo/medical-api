import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/patient/initiate-data-access.dto';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {IPatientDataAccessEntityMapper} from 'app/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';
import {AccessDirection, PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {User} from 'domain/entities';

export class InitiateDataAccessUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const userToGrant = await this.getUserToGrant(dto);

        await this.patientDataAccessSpecification.assertAccessCanBeInitiated(patient, userToGrant);

        const dataAccess = this.createDataAccess(patient, userToGrant);

        await this.patientDataAccessRepository.create(dataAccess);
    }

    private async getUserToGrant(dto: InitiateDataAccessDto): Promise<User> {
        const userToGrant = await this.userRepository.getOneByEmail(dto.email);

        if (userToGrant === null) {
            throw new Error('No doctor account with specified email address. Try another one.');
        }

        return userToGrant;
    }

    private createDataAccess(patient: User, userToGrant: User): PatientDataAccess {
        const dataAccess = this.patientDataAccessEntityMapper.mapByPatientAndGrantedUser(patient, userToGrant);
        dataAccess.direction = AccessDirection.FromPatient;

        return dataAccess;
    }
}
