import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {
    IPersonSuggestedContactRepository,
    IOrganizationSuggestedContactRepository,
} from 'app/modules/suggested-contact/repositories';
import {OrganizationSuggestedContact, PersonSuggestedContact, User} from 'domain/entities';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';
import {PersonSuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/person-suggested-contact-dto.mapper';
import {OrganizationSuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/organization-suggested-contact-dto.mapper';
import {SuggestedContactsDto} from 'domain/dtos/response/suggested-contact';

export class GetPatientContactsUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly personSuggestedContactRepository: IPersonSuggestedContactRepository,
        private readonly organizationSuggestedContactRepository: IOrganizationSuggestedContactRepository,
        private readonly userRepository: IUserRepository,
        private readonly personSuggestedContactDtoMapper: PersonSuggestedContactDtoMapper,
        private readonly organizationSuggestedContactDtoMapper: OrganizationSuggestedContactDtoMapper,
        private readonly userDtoMapper: UserDtoMapper,
    ) {}

    public async getContacts(): Promise<SuggestedContactsDto> {
        const user = await this.authedUserService.getUser();
        const personContacts = await this.personSuggestedContactRepository.getByPatientUserId(user.id);
        const organizationContacts = await this.organizationSuggestedContactRepository.getByPatientUserId(user.id);
        const users = await this.getUsersWhoSuggestedContacts(personContacts, organizationContacts);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        const contactsDto = new SuggestedContactsDto();
        contactsDto.persons = personContacts.map((item) => {
            const dto = this.personSuggestedContactDtoMapper.mapByPersonSuggestedContact(item);
            dto.suggestedByUser = this.userDtoMapper.mapUserDtoByUser(indexedUsers[item.suggestedBy]);

            return dto;
        });
        contactsDto.organizations = organizationContacts.map((item) => {
            const dto = this.organizationSuggestedContactDtoMapper.mapByOrganizationSuggestedContact(item);
            dto.suggestedByUser = this.userDtoMapper.mapUserDtoByUser(indexedUsers[item.suggestedBy]);

            return dto;
        });

        return contactsDto;
    }

    private async getUsersWhoSuggestedContacts(
        personSuggestedContacts: PersonSuggestedContact[],
        organizationSuggestedContact: OrganizationSuggestedContact[],
    ): Promise<User[]> {
        const userIds = [];
        personSuggestedContacts.filter((item) => item.suggestedBy).map((item) => userIds.push(item.suggestedBy));
        organizationSuggestedContact.filter((item) => item.suggestedBy).map((item) => userIds.push(item.suggestedBy));

        return await this.userRepository.getByIds(userIds);
    }
}
