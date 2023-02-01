import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {IMyPatientsService} from 'app/modules/profile/services/my-patients.service';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {EntityNotFoundError} from 'app/errors';

export class PatientProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly patientDataAccessRepository: IPatientDataAccessRepository,
        private readonly myPatientsService: IMyPatientsService,
    ) {}

    public async getProfileInfo(patientUserId: string): Promise<MyPatientDto> {
        const grantedUser = await this.authedUserService.getUser();
        const dataAccess =
            await this.patientDataAccessRepository.getOneWithPatientAndMetadataByGrantedUserIdAndPatientUserId(
                grantedUser.id,
                patientUserId,
            );
        this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndAccess(grantedUser.id, dataAccess);

        const myPatients = await this.myPatientsService.getMyPatients([dataAccess]);
        if (!myPatients.length) {
            throw new EntityNotFoundError('Patient Not Found.');
        }

        return myPatients[0];
    }
}
