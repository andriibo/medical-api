import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {IMyPatientsService} from 'app/modules/profile/services/my-patients.service';

export class PatientListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly myPatientsService: IMyPatientsService,
    ) {}

    public async getMyPatientList(): Promise<MyPatientDto[]> {
        const grantedUser = await this.authedUserService.getUser();

        return await this.myPatientsService.getMyPatients(grantedUser.id);
    }
}
