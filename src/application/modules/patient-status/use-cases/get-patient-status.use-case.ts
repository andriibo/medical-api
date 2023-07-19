import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientStatusDto} from 'domain/dtos/response/patient-status/patient-status.dto';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {PatientStatusSpecification} from 'app/modules/patient-status/specifications/patient-status.specification';

export class GetPatientStatusUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientStatusRepository: IPatientStatusRepository,
        private readonly patientStatusSpecification: PatientStatusSpecification,
    ) {}

    public async getPatientStatus(patientUserId: string): Promise<PatientStatusDto> {
        const user = await this.authedUserService.getUser();

        await this.patientStatusSpecification.assertUserCanGetPatientStatus(user, patientUserId);

        const patientStatus = await this.patientStatusRepository.getByPatientUserId(patientUserId);

        return PatientStatusDto.fromPatientStatus(patientStatus);
    }
}
