import {
    IOrganizationEmergencyContactRepository,
    IPersonEmergencyContactRepository,
} from 'app/modules/emergency-contact/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {
    EmergencyContactsDto,
    OrganizationEmergencyContactDto,
    PersonEmergencyContactDto,
} from 'domain/dtos/response/emergency-contact';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

export class GetPatientContactsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly personEmergencyContactRepository: IPersonEmergencyContactRepository,
        private readonly organizationEmergencyContactRepository: IOrganizationEmergencyContactRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async getContacts(patientUserId: string): Promise<EmergencyContactsDto> {
        const grantedUser = await this.authedUserService.getUser();
        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            grantedUser.id,
            patientUserId,
        );
        const personContacts = await this.personEmergencyContactRepository.getByUserId(patientUserId);
        const organizationContacts = await this.organizationEmergencyContactRepository.getByUserId(patientUserId);

        const contactsDto = new EmergencyContactsDto();
        contactsDto.persons = personContacts.map((item) => PersonEmergencyContactDto.fromPersonEmergencyContact(item));
        contactsDto.organizations = organizationContacts.map((item) =>
            OrganizationEmergencyContactDto.fromOrganizationEmergencyContact(item),
        );

        return contactsDto;
    }
}
