import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {SuggestedContact} from 'domain/entities/suggested-contact.entity';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {EntityNotFoundError} from 'app/errors';
import {ApproveSuggestedContactByPatientService} from 'app/modules/suggested-contact/services/approve-suggested-contact-by-patient.service';

export class ApproveSuggestedContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        private readonly approveSuggestedContactByPatientService: ApproveSuggestedContactByPatientService,
    ) {}

    public async approveSuggestedContact(contactId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const suggestedContact = await this.getSuggestedContact(contactId);

        await this.approveSuggestedContactByPatientService.approveSuggestedContact(user, suggestedContact);
    }

    private async getSuggestedContact(contactId: string): Promise<SuggestedContact> {
        const suggestedContact = await this.suggestedContactRepository.getOneById(contactId);

        if (suggestedContact === null) {
            throw new EntityNotFoundError('Suggested Contact Not Found.');
        }

        return suggestedContact;
    }
}
