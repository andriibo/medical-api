import {IEmergencyContactRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {ContactDto} from 'domain/dtos/response/emergency-contact/contact.dto';

export class ContactListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
    ) {}

    public async getList(): Promise<ContactDto[]> {
        const user = await this.authedUserService.getUser();

        const items = await this.emergencyContactRepository.getByUserId(user.id);

        return items.map((item) => ContactDto.fromEmergencyContact(item));
    }
}
