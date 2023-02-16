import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ContactDto} from 'domain/dtos/response/emergency-contact/contact.dto';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

export class PatientContactListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async getList(patientUserId: string): Promise<ContactDto[]> {
        const grantedUser = await this.authedUserService.getUser();
        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            grantedUser.id,
            patientUserId,
        );
        const items = await this.emergencyContactRepository.getByUserId(patientUserId);

        return items.map((item) => ContactDto.fromEmergencyContact(item));
    }
}
