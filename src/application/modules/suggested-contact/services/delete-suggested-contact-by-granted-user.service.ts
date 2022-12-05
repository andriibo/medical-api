import {SuggestedContact, User} from 'domain/entities';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';

export class DeleteSuggestedContactByGrantedUserService {
    public constructor(
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        private readonly suggestedContactSpecification: SuggestedContactSpecification,
    ) {}

    public async deleteSuggestedContact(doctor: User, suggestedContact: SuggestedContact): Promise<void> {
        this.suggestedContactSpecification.assertUserCanDeleteContact(doctor, suggestedContact);
        await this.suggestedContactRepository.delete(suggestedContact);
    }
}
