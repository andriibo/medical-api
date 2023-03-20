import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {EmergencyContact} from 'domain/entities/emergency-contact.entity';
import {EmergencyContactSpecification} from 'app/modules/emergency-contact/specifications/emergency-contact.specification';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class DeleteContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        private readonly emergencyContactSpecification: EmergencyContactSpecification,
    ) {}

    public async deleteContact(contactId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contact = await this.getContact(contactId);

        await this.emergencyContactSpecification.assertUserCanDeleteContact(user, contact);
        await this.emergencyContactRepository.delete(contact);
    }

    private async getContact(contactId: string): Promise<EmergencyContact> {
        const contact = await this.emergencyContactRepository.getOneById(contactId);

        if (contact === null) {
            throw new EntityNotFoundError('Contact Not Found.');
        }

        return contact;
    }
}
