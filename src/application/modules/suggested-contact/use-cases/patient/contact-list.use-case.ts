import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactDto} from 'domain/dtos/response/suggested-contact/suggested-contact.dto';

export class ContactListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly suggestedContactRepository: ISuggestedContactRepository,
    ) {}

    public async getList(): Promise<SuggestedContactDto[]> {
        const user = await this.authedUserService.getUser();
        const items = await this.suggestedContactRepository.getByPatientUserId(user.id);

        return items.map((item) => SuggestedContactDto.fromSuggestedContact(item));
    }
}
