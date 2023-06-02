import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ContactDto} from 'domain/dtos/response/emergency-contact/contact.dto';

export class ContactListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
    ) {}

    public async getList(): Promise<ContactDto[]> {
        const user = await this.authedUserService.getUser();

        const items = await this.emergencyContactRepository.getByUserIdOrderedByRank(user.id);

        return items.map((item) => ContactDto.fromEmergencyContact(item));
    }
}
