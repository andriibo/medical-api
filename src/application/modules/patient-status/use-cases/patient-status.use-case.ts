import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {MyPatientStatusDto} from 'domain/dtos/response/patient-status/my-patient-status.dto';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {EntityNotFoundError} from 'app/errors';

export class PatientStatusUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientStatusRepository: IPatientStatusRepository,
    ) {}

    public async getMyPatientStatus(): Promise<MyPatientStatusDto> {
        const user = await this.authedUserService.getUser();
        const patientStatus = await this.patientStatusRepository.getByPatientUserId(user.id);
        if (patientStatus === null) {
            throw new EntityNotFoundError('PatientStatus Not Found.');
        }

        return MyPatientStatusDto.fromPatientStatus(patientStatus);
    }
}
