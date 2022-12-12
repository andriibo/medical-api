import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {MySuggestedContactDto} from 'domain/dtos/response/suggested-contact/my-suggested-contact.dto';

export class PatientContactListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly suggestedContactRepository: ISuggestedContactRepository,
    ) {}

    public async getList(patientUserId: string): Promise<MySuggestedContactDto[]> {
        const grantedUser = await this.authedUserService.getUser();

        const items = await this.suggestedContactRepository.getByPatientUserIdAndSuggestedBy(
            patientUserId,
            grantedUser.id,
        );

        return items.map((item) => MySuggestedContactDto.fromSuggestedContact(item));
    }
}
