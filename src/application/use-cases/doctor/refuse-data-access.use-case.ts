import {IPatientDataAccessRepository, IUserRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {RefuseDataAccessDto} from 'domain/dtos/data-access/refuse-data-access.dto';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';
import {PatientDataAccessStatus, PatientDataAccess} from 'domain/entities/patient-data-access.entity';

export class RefuseDataAccessUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async refuseDataAccess(dto: RefuseDataAccessDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const dataAccess = await this.getDataAccess(dto);

        await this.patientDataAccessSpecification.assertGrantedUserCanRefuseAccess(user, dataAccess);

        dataAccess.status = PatientDataAccessStatus.Refused;

        await this.patientDataAccessRepository.update(dataAccess);
    }

    private async getDataAccess(dto: RefuseDataAccessDto): Promise<PatientDataAccess> {
        const dataAccess = await this.patientDataAccessRepository.getOneByAccessId(dto.accessId);

        if (dataAccess === null) {
            throw new Error('Access Not Found.');
        }

        return dataAccess;
    }
}
