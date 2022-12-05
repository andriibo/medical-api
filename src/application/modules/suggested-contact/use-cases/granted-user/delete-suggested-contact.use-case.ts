import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {SuggestedContact} from 'domain/entities/suggested-contact.entity';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {EntityNotFoundError} from 'app/errors';
import {DeleteSuggestedContactByGrantedUserService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-granted-user.service';

export class DeleteSuggestedContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        private readonly deleteSuggestedContactByGrantedUserService: DeleteSuggestedContactByGrantedUserService,
    ) {}

    public async deleteSuggestedContact(contactId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const dataAccess = await this.getSuggestedContact(contactId);

        await this.deleteSuggestedContactByGrantedUserService.deleteSuggestedContact(user, dataAccess);
    }

    private async getSuggestedContact(contactId: string): Promise<SuggestedContact> {
        const suggestedContact = await this.suggestedContactRepository.getOneById(contactId);

        if (suggestedContact === null) {
            throw new EntityNotFoundError('Suggested Contact Not Found.');
        }

        return suggestedContact;
    }
}
