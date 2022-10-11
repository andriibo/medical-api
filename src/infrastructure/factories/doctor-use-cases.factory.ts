import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {DataAccessListUseCase, RefuseDataAccessUseCase} from 'app/use-cases/doctor';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';

@Injectable()
export class DoctorUseCasesFactory {
    constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
    ) {}

    public createDataAccessListUseCase(): DataAccessListUseCase {
        return new DataAccessListUseCase(this.userRepository, this.patientDataAccessRepository, this.authedUserService);
    }

    public createRefuseDataAccessUseCase(): RefuseDataAccessUseCase {
        const patientDataAccessSpecification = new PatientDataAccessSpecification(this.patientDataAccessRepository);

        return new RefuseDataAccessUseCase(
            this.userRepository,
            this.patientDataAccessRepository,
            this.authedUserService,
            patientDataAccessSpecification,
        );
    }
}
