import {PatientStatusEnum} from 'domain/constants/patient.const';
import {currentUnixTimestamp} from 'support/date.helper';
import {PatientStatus} from 'domain/entities/patient-status.entity';
import {User} from 'domain/entities';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientStatusSpecification} from 'app/modules/patient-status/specifications/patient-status.specification';

export abstract class SetPatientStatusUseCase {
    public constructor(
        protected readonly authedUserService: IAuthedUserService,
        protected readonly patientStatusRepository: IPatientStatusRepository,
        protected readonly patientStatusSpecification: PatientStatusSpecification,
    ) {}

    protected async updatePatientStatusIfNeeded(
        patientStatus: PatientStatus,
        status: PatientStatusEnum,
        setByUser: User,
    ): Promise<void> {
        if (patientStatus.status === status) {
            return;
        }

        patientStatus.status = status;
        patientStatus.setBy = setByUser.id;
        patientStatus.setAt = currentUnixTimestamp();

        await this.patientStatusRepository.persist(patientStatus);
    }
}
