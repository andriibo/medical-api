import {
    IPersonEmergencyContactRepository,
    IOrganizationEmergencyContactRepository,
} from 'app/modules/emergency-contact/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {
    EmergencyContactsDto,
    PersonEmergencyContactDto,
    OrganizationEmergencyContactDto,
} from 'domain/dtos/response/emergency-contact';

export class GetContactsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly personEmergencyContactRepository: IPersonEmergencyContactRepository,
        private readonly organizationEmergencyContactRepository: IOrganizationEmergencyContactRepository,
    ) {}

    public async getContacts(): Promise<EmergencyContactsDto> {
        const user = await this.authedUserService.getUser();

        const personContacts = await this.personEmergencyContactRepository.getByUserIdOrderedByRank(user.id);
        const organizationContacts = await this.organizationEmergencyContactRepository.getByUserIdOrderedByRank(
            user.id,
        );

        const contactsDto = new EmergencyContactsDto();
        contactsDto.persons = personContacts.map((item) => PersonEmergencyContactDto.fromPersonEmergencyContact(item));
        contactsDto.organizations = organizationContacts.map((item) =>
            OrganizationEmergencyContactDto.fromOrganizationEmergencyContact(item),
        );

        return contactsDto;
    }
}
