import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {
    IPersonSuggestedContactRepository,
    IOrganizationSuggestedContactRepository,
} from 'app/modules/suggested-contact/repositories';
import {PersonSuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/person-suggested-contact-dto.mapper';
import {OrganizationSuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/organization-suggested-contact-dto.mapper';
import {SuggestedContactsDto} from 'domain/dtos/response/suggested-contact';

export class GetGrantedUserContactsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly personSuggestedContactRepository: IPersonSuggestedContactRepository,
        private readonly organizationSuggestedContactRepository: IOrganizationSuggestedContactRepository,
        private readonly personSuggestedContactDtoMapper: PersonSuggestedContactDtoMapper,
        private readonly organizationSuggestedContactDtoMapper: OrganizationSuggestedContactDtoMapper,
    ) {}

    public async getContacts(patientUserId: string): Promise<SuggestedContactsDto> {
        const grantedUser = await this.authedUserService.getUser();

        const personContacts = await this.personSuggestedContactRepository.getByPatientUserIdAndSuggestedBy(
            patientUserId,
            grantedUser.id,
        );
        const organizationContacts = await this.organizationSuggestedContactRepository.getByPatientUserIdAndSuggestedBy(
            patientUserId,
            grantedUser.id,
        );

        const contactsDto = new SuggestedContactsDto();
        contactsDto.persons = personContacts.map((item) =>
            this.personSuggestedContactDtoMapper.mapByPersonSuggestedContact(item),
        );
        contactsDto.organizations = organizationContacts.map((item) =>
            this.organizationSuggestedContactDtoMapper.mapByOrganizationSuggestedContact(item),
        );

        return contactsDto;
    }
}
