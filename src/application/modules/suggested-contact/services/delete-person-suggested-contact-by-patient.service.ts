import {PersonSuggestedContact, User} from 'domain/entities';
import {IPersonSuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';

export class DeletePersonSuggestedContactByPatientService {
    public constructor(
        private readonly contactRepository: IPersonSuggestedContactRepository,
        private readonly contactSpecification: SuggestedContactSpecification,
    ) {}

    public async deleteSuggestedContact(patient: User, suggestedContact: PersonSuggestedContact): Promise<void> {
        this.contactSpecification.assertPatientCanModifyContact(patient, suggestedContact);

        await this.contactRepository.delete(suggestedContact);
    }
}
