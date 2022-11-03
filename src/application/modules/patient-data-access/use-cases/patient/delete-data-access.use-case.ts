import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {DeletePatientDataAccessService} from 'app/modules/patient-data-access/services/delete-patient-data-access.service';

export class DeleteDataAccessUseCase {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly deletePatientDataAccessService: DeletePatientDataAccessService,
    ) {}

    public async deleteDataAccess(accessId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const dataAccess = await this.getDataAccess(accessId);

        await this.deletePatientDataAccessService.deleteDataAccess(user, dataAccess);
    }

    private async getDataAccess(accessId: string): Promise<PatientDataAccess> {
        const dataAccess = await this.patientDataAccessRepository.getOneById(accessId);

        if (dataAccess === null) {
            throw new Error('Access Not Found.');
        }

        return dataAccess;
    }
}
