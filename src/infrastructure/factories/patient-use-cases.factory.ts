import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {InitiateDataAccessUseCase, DataAccessListUseCase, DeleteDataAccessUseCase} from 'app/use-cases/patient';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {IPatientDataAccessEntityMapper} from 'app/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';

@Injectable()
export class PatientUseCasesFactory {
    constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IPatientDataAccessEntityMapper)
        private readonly patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
    ) {}

    public createInitiateDataAccessUseCase(): InitiateDataAccessUseCase {
        const patientDataAccessSpecification = new PatientDataAccessSpecification(this.patientDataAccessRepository);

        return new InitiateDataAccessUseCase(
            this.userRepository,
            this.patientDataAccessRepository,
            this.authedUserService,
            this.patientDataAccessEntityMapper,
            patientDataAccessSpecification,
        );
    }

    public createDataAccessListUseCase(): DataAccessListUseCase {
        return new DataAccessListUseCase(this.userRepository, this.patientDataAccessRepository, this.authedUserService);
    }

    public createDeleteDataAccessUseCase(): DeleteDataAccessUseCase {
        const patientDataAccessSpecification = new PatientDataAccessSpecification(this.patientDataAccessRepository);

        return new DeleteDataAccessUseCase(
            this.userRepository,
            this.patientDataAccessRepository,
            this.authedUserService,
            patientDataAccessSpecification,
        );
    }
}
