import {IPersonEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PersonContactDto} from 'domain/dtos/response/emergency-contact';

export class ContactListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IPersonEmergencyContactRepository,
    ) {}

    public async getList(): Promise<PersonContactDto[]> {
        const user = await this.authedUserService.getUser();

        const items = await this.emergencyContactRepository.getByUserIdOrderedByRank(user.id);

        return items.map((item) => PersonContactDto.fromPersonEmergencyContact(item));
    }
}
