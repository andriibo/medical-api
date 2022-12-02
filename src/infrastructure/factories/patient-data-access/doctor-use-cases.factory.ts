import {Inject, Injectable} from '@nestjs/common';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {DeleteDataAccessUseCase} from 'app/modules/patient-data-access/use-cases/doctor';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {DeleteDataAccessByDoctorService} from 'app/modules/patient-data-access/services/delete-data-access-by-doctor.service';

@Injectable()
export class DoctorUseCasesFactory {
    public constructor(
        @Inject(IPatientDataAccessRepository)
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(PatientDataAccessSpecification)
        private readonly deleteDataAccessByDoctorService: DeleteDataAccessByDoctorService,
    ) {}

    public createDeleteDataAccessUseCase(): DeleteDataAccessUseCase {
        return new DeleteDataAccessUseCase(
            this.patientDataAccessRepository,
            this.authedUserService,
            this.deleteDataAccessByDoctorService,
        );
    }
}
