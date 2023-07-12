import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientStatusDto} from 'domain/dtos/response/patient-status/patient-status.dto';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';

export class PatientStatusUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientStatusRepository: IPatientStatusRepository,
    ) {}

    public async getMyPatientStatus(): Promise<PatientStatusDto> {
        const user = await this.authedUserService.getUser();
        const patientStatus = await this.patientStatusRepository.getByPatientUserId(user.id);
        if (patientStatus === null) {
            return PatientStatusDto.getDtoWithDefaultValues();
        }

        return PatientStatusDto.fromPatientStatus(patientStatus);
    }
}
