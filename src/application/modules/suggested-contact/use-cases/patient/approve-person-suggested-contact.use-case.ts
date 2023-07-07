import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PersonSuggestedContact} from 'domain/entities/person-suggested-contact.entity';
import {IPersonSuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {EntityNotFoundError} from 'app/errors';
import {ApprovePersonSuggestedContactByPatientService} from 'app/modules/suggested-contact/services';

export class ApprovePersonSuggestedContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly contactRepository: IPersonSuggestedContactRepository,
        private readonly approveSuggestedContactByPatientService: ApprovePersonSuggestedContactByPatientService,
    ) {}

    public async approveContact(contactId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contact = await this.getContact(contactId);

        await this.approveSuggestedContactByPatientService.approveSuggestedContact(user, contact);
    }

    private async getContact(contactId: string): Promise<PersonSuggestedContact> {
        const contact = await this.contactRepository.getOneById(contactId);

        if (contact === null) {
            throw new EntityNotFoundError('Suggested Contact Not Found.');
        }

        return contact;
    }
}
