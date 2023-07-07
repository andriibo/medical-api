import {PersonSuggestedContact, User} from 'domain/entities';
import {IPersonSuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {IPersonEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/person-emergency-contact-entity.mapper';
import {PersonEmergencyContactSpecification} from 'app/modules/emergency-contact/specifications';
import {IPersonEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';

export class ApprovePersonSuggestedContactByPatientService {
    public constructor(
        private readonly suggestedContactRepository: IPersonSuggestedContactRepository,
        private readonly suggestedContactSpecification: SuggestedContactSpecification,
        private readonly emergencyContactEntityMapper: IPersonEmergencyContactEntityMapper,
        private readonly emergencyContactSpecification: PersonEmergencyContactSpecification,
        private readonly emergencyContactRepository: IPersonEmergencyContactRepository,
    ) {}

    public async approveSuggestedContact(patient: User, suggestedContact: PersonSuggestedContact): Promise<void> {
        this.suggestedContactSpecification.assertPatientCanModifyContact(patient, suggestedContact);
        this.emergencyContactSpecification.assertUserCanCreateContact(patient);

        const emergencyContact = this.emergencyContactEntityMapper.mapByPersonSuggestedContact(suggestedContact);

        await this.emergencyContactRepository.create(emergencyContact);
        await this.suggestedContactRepository.delete(suggestedContact);
    }
}
