import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {PatientDataAccessStatusEnum} from 'domain/constants/patient-data-access.const';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class RefuseDataAccessUseCase {
    public constructor(
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async refuseDataAccess(accessId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const dataAccess = await this.getDataAccess(accessId);

        await this.patientDataAccessSpecification.assertGrantedUserCanRefuseAccess(user, dataAccess);

        dataAccess.status = PatientDataAccessStatusEnum.Refused;

        await this.patientDataAccessRepository.update(dataAccess);
    }

    private async getDataAccess(accessId: string): Promise<PatientDataAccess> {
        const dataAccess = await this.patientDataAccessRepository.getOneById(accessId);

        if (dataAccess === null) {
            throw new EntityNotFoundError('Access Not Found.');
        }

        return dataAccess;
    }
}
