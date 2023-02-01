import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {IMyPatientsService} from 'app/modules/profile/services/my-patients.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';

export class PatientListProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly myPatientsService: IMyPatientsService,
    ) {}

    public async getMyPatientList(): Promise<MyPatientDto[]> {
        const grantedUser = await this.authedUserService.getUser();
        const items = await this.patientDataAccessRepository.getApprovedByGrantedUserIdAndPatientUserId(grantedUser.id);

        return await this.myPatientsService.getMyPatients(items, grantedUser.id);
    }
}
