import {PersonSuggestedContact, User} from 'domain/entities';
import {IPersonSuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';

export class DeletePersonSuggestedContactByGrantedUserService {
    public constructor(
        private readonly contactRepository: IPersonSuggestedContactRepository,
        private readonly contactSpecification: SuggestedContactSpecification,
    ) {}

    public async deleteSuggestedContact(doctor: User, suggestedContact: PersonSuggestedContact): Promise<void> {
        this.contactSpecification.assertUserCanDeletePersonContact(doctor, suggestedContact);

        await this.contactRepository.delete(suggestedContact);
    }
}
