import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {DataAccessListUseCase, DeleteDataAccessUseCase} from 'app/modules/patient-data-access/use-cases/doctor';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {DeleteDataAccessByDoctorService} from 'app/modules/patient-data-access/services/delete-data-access-by-doctor.service';
import {AccessToRegisteredPatientService} from 'app/modules/patient-data-access/services/access-to-registered-patient.service';
import {AccessToUnregisteredPatientService} from 'app/modules/patient-data-access/services/access-to-unregistered-patient.service';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

@Injectable()
export class DoctorUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(PatientDataAccessSpecification)
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        @Inject(DeleteDataAccessByDoctorService)
        private readonly deleteDataAccessByDoctorService: DeleteDataAccessByDoctorService,
        @Inject(AccessToRegisteredPatientService)
        private readonly accessToRegisteredPatientService: AccessToRegisteredPatientService,
        @Inject(AccessToUnregisteredPatientService)
        private readonly accessToUnregisteredPatientService: AccessToUnregisteredPatientService,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
    ) {}

    public createDataAccessListUseCase(): DataAccessListUseCase {
        return new DataAccessListUseCase(
            this.userRepository,
            this.patientDataAccessRepository,
            this.authedUserService,
            this.fileUrlService,
        );
    }

    public createDeleteDataAccessUseCase(): DeleteDataAccessUseCase {
        return new DeleteDataAccessUseCase(
            this.patientDataAccessRepository,
            this.authedUserService,
            this.deleteDataAccessByDoctorService,
        );
    }
}
