import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';

export class DeleteDataAccessUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async deleteDataAccess(accessId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const dataAccess = await this.getDataAccess(accessId);

        await this.patientDataAccessSpecification.assertPatientCanDeleteAccess(user, dataAccess);

        await this.patientDataAccessRepository.delete(dataAccess);
    }

    private async getDataAccess(accessId: string): Promise<PatientDataAccess> {
        const dataAccess = await this.patientDataAccessRepository.getOneById(accessId);

        if (dataAccess === null) {
            throw new Error('Access Not Found.');
        }

        return dataAccess;
    }
}