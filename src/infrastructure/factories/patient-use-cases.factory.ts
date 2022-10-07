import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {InitiateDataAccessUseCase} from 'app/use-cases/patient';

@Injectable()
export class PatientUseCasesFactory {
    constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
    ) {}

    public createInitiateDataAccessUseCase(): InitiateDataAccessUseCase {
        return new InitiateDataAccessUseCase(this.userRepository, this.patientDataAccessRepository);
    }
}
