import {IPatientDataAccessRepository, IUserRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {DeleteDataAccessDto} from 'domain/dtos/data-access/delete-data-access.dto';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class DeleteDataAccessUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async deleteDataAccess(dto: DeleteDataAccessDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const dataAccess = await this.getDataAccess(dto);

        await this.patientDataAccessSpecification.assertGrantedUserCanDeleteAccess(user, dataAccess);

        await this.patientDataAccessRepository.delete(dataAccess);
    }

    private async getDataAccess(dto: DeleteDataAccessDto): Promise<PatientDataAccess> {
        const dataAccess = await this.patientDataAccessRepository.getOneByAccessId(dto.accessId);

        if (dataAccess === null) {
            throw new EntityNotFoundError('Access Not Found.');
        }

        return dataAccess;
    }
}
