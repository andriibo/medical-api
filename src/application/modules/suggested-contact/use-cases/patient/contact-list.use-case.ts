import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactDto} from 'domain/dtos/response/suggested-contact/suggested-contact.dto';
import {SuggestedContact, User} from 'domain/entities';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class ContactListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        private readonly userRepository: IUserRepository,
    ) {}

    public async getList(): Promise<SuggestedContactDto[]> {
        const user = await this.authedUserService.getUser();
        const items = await this.suggestedContactRepository.getByPatientUserId(user.id);
        const users = await this.getSuggestedUsers(items);

        const indexedUsers = {};
        users.map((user) => (indexedUsers[user.id] = user));

        return items.map((item) => {
            const dto = SuggestedContactDto.fromSuggestedContact(item);
            dto.suggestedUser = UserDto.fromUser(indexedUsers[item.suggestedBy]);

            return dto;
        });
    }

    private async getSuggestedUsers(items: SuggestedContact[]): Promise<User[]> {
        const userIds = items.filter((item) => item.suggestedBy).map((item) => item.suggestedBy);

        return await this.userRepository.getByIds(userIds);
    }
}
