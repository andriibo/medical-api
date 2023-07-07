import {IPersonEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PersonContactDto} from 'domain/dtos/response/emergency-contact';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

export class PatientContactListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IPersonEmergencyContactRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async getList(patientUserId: string): Promise<PersonContactDto[]> {
        const grantedUser = await this.authedUserService.getUser();
        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            grantedUser.id,
            patientUserId,
        );
        const items = await this.emergencyContactRepository.getByUserId(patientUserId);

        return items.map((item) => PersonContactDto.fromPersonEmergencyContact(item));
    }
}
