import {SuggestedContact, User} from 'domain/entities';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {IPersonEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/person-emergency-contact-entity.mapper';
import {PersonEmergencyContactSpecification} from 'app/modules/emergency-contact/specifications';
import {IPersonEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';

export class ApproveSuggestedContactByPatientService {
    public constructor(
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        private readonly suggestedContactSpecification: SuggestedContactSpecification,
        private readonly emergencyContactEntityMapper: IPersonEmergencyContactEntityMapper,
        private readonly emergencyContactSpecification: PersonEmergencyContactSpecification,
        private readonly emergencyContactRepository: IPersonEmergencyContactRepository,
    ) {}

    public async approveSuggestedContact(patient: User, suggestedContact: SuggestedContact): Promise<void> {
        this.suggestedContactSpecification.assertPatientCanModifyContact(patient, suggestedContact);
        this.emergencyContactSpecification.assertUserCanCreateContact(patient);

        const emergencyContact = this.emergencyContactEntityMapper.mapBySuggestedContact(suggestedContact);

        await this.emergencyContactRepository.create(emergencyContact);
        await this.suggestedContactRepository.delete(suggestedContact);
    }
}
