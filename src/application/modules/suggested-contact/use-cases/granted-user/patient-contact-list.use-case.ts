import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactDto} from 'domain/dtos/response/suggested-contact/suggested-contact.dto';

export class PatientContactListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly suggestedContactRepository: ISuggestedContactRepository,
    ) {}

    public async getList(patientUserId: string): Promise<SuggestedContactDto[]> {
        const grantedUser = await this.authedUserService.getUser();

        const items = await this.suggestedContactRepository.getByPatientUserIdAndSuggestedBy(
            patientUserId,
            grantedUser.id,
        );

        return items.map((item) => SuggestedContactDto.fromSuggestedContact(item));
    }
}
