import {SuggestedContact, User} from 'domain/entities';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';

export class DeleteSuggestedContactByPatientService {
    public constructor(
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        private readonly suggestedContactSpecification: SuggestedContactSpecification,
    ) {}

    public async deleteSuggestedContact(patient: User, suggestedContact: SuggestedContact): Promise<void> {
        this.suggestedContactSpecification.assertPatientCanDeleteContact(patient, suggestedContact);
        await this.suggestedContactRepository.delete(suggestedContact);
    }
}
