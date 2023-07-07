import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPersonSuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {PersonSuggestedContactDto} from 'domain/dtos/response/suggested-contact/person-suggested-contact.dto';
import {PersonSuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/person-suggested-contact-dto.mapper';

export class PatientContactListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly suggestedContactRepository: IPersonSuggestedContactRepository,
        private readonly suggestedContactDtoMapper: PersonSuggestedContactDtoMapper,
    ) {}

    public async getList(patientUserId: string): Promise<PersonSuggestedContactDto[]> {
        const grantedUser = await this.authedUserService.getUser();

        const items = await this.suggestedContactRepository.getByPatientUserIdAndSuggestedBy(
            patientUserId,
            grantedUser.id,
        );

        return items.map((item) => this.suggestedContactDtoMapper.mapByPersonSuggestedContact(item));
    }
}
