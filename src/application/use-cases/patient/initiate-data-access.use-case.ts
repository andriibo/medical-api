import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/patient/initiate-data-access.dto';
import {IAuthedUserService} from 'app/services/authed-user.service';

export class InitiateDataAccessUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly authedUserService: IAuthedUserService,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        console.log(user);
    }
}
