import {IPatientDataAccessRepository, IUserRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';
import {PatientDataAccessStatus, PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class RefuseDataAccessUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async refuseDataAccess(accessId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const dataAccess = await this.getDataAccess(accessId);

        await this.patientDataAccessSpecification.assertGrantedUserCanRefuseAccess(user, dataAccess);

        dataAccess.status = PatientDataAccessStatus.Refused;

        await this.patientDataAccessRepository.update(dataAccess);
    }

    private async getDataAccess(accessId: string): Promise<PatientDataAccess> {
        const dataAccess = await this.patientDataAccessRepository.getOneByAccessId(accessId);

        if (dataAccess === null) {
            throw new EntityNotFoundError('Access Not Found.');
        }

        return dataAccess;
    }
}
