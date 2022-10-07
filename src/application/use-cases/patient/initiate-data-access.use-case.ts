import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {InitiateDataAccessDto} from 'domain/dtos/patient/initiate-data-access.dto';

export class InitiateDataAccessUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
    ) {}

    public async initiateDataAccess(dto: InitiateDataAccessDto): Promise<void> {}
}
