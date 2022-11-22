import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {SuggestedContact} from 'domain/entities/suggested-contact.entity';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {EntityNotFoundError} from 'app/errors';
import {DeleteSuggestedContactByDoctorService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-doctor.service';

export class DeleteSuggestedContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        private readonly deleteSuggestedContactByDoctorService: DeleteSuggestedContactByDoctorService,
    ) {}

    public async deleteSuggestedContact(accessId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const dataAccess = await this.getSuggestedContact(accessId);

        await this.deleteSuggestedContactByDoctorService.deleteSuggestedContact(user, dataAccess);
    }

    private async getSuggestedContact(accessId: string): Promise<SuggestedContact> {
        const suggestedContact = await this.suggestedContactRepository.getOneById(accessId);

        if (suggestedContact === null) {
            throw new EntityNotFoundError('Suggested Contact Not Found.');
        }

        return suggestedContact;
    }
}
