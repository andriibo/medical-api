import {ContactDto} from 'domain/dtos/request/emergency-contact/contact.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/emergency-contact-entity.mapper';
import {EmergencyContact} from 'domain/entities';
import {EmergencyContactSpecification} from 'app/modules/emergency-contact/specifications/emergency-contact.specification';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class UpdateContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        private readonly emergencyContactEntityMapper: IEmergencyContactEntityMapper,
        private readonly emergencyContactSpecification: EmergencyContactSpecification,
    ) {}

    public async updateContact(contactId: string, dto: ContactDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contact = await this.getContact(contactId);

        await this.emergencyContactSpecification.assertUserCanUpdateContact(user, contact);

        const modifiedContact = this.emergencyContactEntityMapper.mapByContactDto(dto, contact);

        await this.emergencyContactRepository.update(modifiedContact);
    }

    private async getContact(contactId: string): Promise<EmergencyContact> {
        const contact = await this.emergencyContactRepository.getOneById(contactId);

        if (contact === null) {
            throw new EntityNotFoundError('Contact Not Found.');
        }

        return contact;
    }
}
