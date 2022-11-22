import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {User} from 'domain/entities';
import {SuggestedContactDto} from 'domain/dtos/request/suggested-contact/suggested-contact.dto';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {SuggestedContact} from 'domain/entities/suggested-contact.entity';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {ISuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/suggested-contact-entity.mapper';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

export class CreateSuggestedContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly suggestedContactRepository: ISuggestedContactRepository,
        private readonly suggestedContactEntityMapper: ISuggestedContactEntityMapper,
        private readonly suggestedContactSpecification: SuggestedContactSpecification,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async createSuggestedContact(dto: SuggestedContactDto): Promise<void> {
        const user = await this.authedUserService.getUser();

        this.suggestedContactSpecification.assertUserCanCreateSuggestedContact(user);
        await this.patientDataAccessSpecification.assertGrantedUserHasAccess(user, dto.patientUserId);

        const suggestedContact = this.createContact(user, dto);

        await this.suggestedContactRepository.create(suggestedContact);
    }

    private createContact(doctor: User, dto: SuggestedContactDto): SuggestedContact {
        const suggestedContact = this.suggestedContactEntityMapper.mapBySuggestedContactDto(dto);
        suggestedContact.suggestedBy = doctor.id;

        return suggestedContact;
    }
}
