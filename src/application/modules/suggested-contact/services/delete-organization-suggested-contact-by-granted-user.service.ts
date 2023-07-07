import {OrganizationSuggestedContact, User} from 'domain/entities';
import {IOrganizationSuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';

export class DeleteOrganizationSuggestedContactByGrantedUserService {
    public constructor(
        private readonly contactRepository: IOrganizationSuggestedContactRepository,
        private readonly contactSpecification: SuggestedContactSpecification,
    ) {}

    public async deleteSuggestedContact(doctor: User, suggestedContact: OrganizationSuggestedContact): Promise<void> {
        this.contactSpecification.assertUserCanDeletePersonContact(doctor, suggestedContact);

        await this.contactRepository.delete(suggestedContact);
    }
}
