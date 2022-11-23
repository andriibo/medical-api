import {SuggestedContact, User} from 'domain/entities';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {IEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/emergency-contact-entity.mapper';
import {EmergencyContactSpecification} from 'app/modules/emergency-contact/specifications/emergency-contact.specification';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';

export class ApproveSuggestedContactByPatientService {
    public constructor(
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        private readonly suggestedContactSpecification: SuggestedContactSpecification,
        private readonly emergencyContactEntityMapper: IEmergencyContactEntityMapper,
        private readonly emergencyContactSpecification: EmergencyContactSpecification,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
    ) {}

    public async approveSuggestedContact(patient: User, suggestedContact: SuggestedContact): Promise<void> {
        this.suggestedContactSpecification.assertPatientCanModifyContact(patient, suggestedContact);
        this.emergencyContactSpecification.assertUserCanCreateContact(patient);

        const emergencyContact = this.emergencyContactEntityMapper.mapBySuggestedContactDto(suggestedContact);

        await this.emergencyContactRepository.create(emergencyContact);
        await this.suggestedContactRepository.delete(suggestedContact);
    }
}
